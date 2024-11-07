from django.shortcuts import render, redirect
from transbank.webpay.webpay_plus.transaction import Transaction, WebpayOptions
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

# Configuración de Transbank (asegúrate de usar las claves correctas)
TRANSBANK_COMMERCE_CODE = '597055555532'
TRANSBANK_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'
TRANSBANK_ENVIRONMENT = 'TEST'

@csrf_exempt
def iniciar_pago(request):
    total_amount = 3000 
    buy_order = 'order12345'
    session_id = 'session12345'
    return_url = return_url = 'http://127.0.0.1:8100/confirmacion_pago/'

    # Configurar la transacción con las claves
    transaction = Transaction(WebpayOptions(
        commerce_code=TRANSBANK_COMMERCE_CODE,
        api_key=TRANSBANK_API_KEY,
    ))

    try:
        # Crear la transacción
        response = transaction.create(
            buy_order=buy_order,
            session_id=session_id,
            amount=total_amount,
            return_url=return_url
        )
        
        print(f"Respuesta de Transbank: {response}")  # Imprimir la respuesta para depuración

        # Verificar si la respuesta contiene la URL de pago
        if 'url' in response and 'token' in response:
            # Redirigir al usuario a la URL de Transbank con el token
            return redirect(response['url'] + '?token_ws=' + response['token'])
        else:
            # Si no hay URL o token, redirigir a error
            print("Error: No se recibió URL o token")
            return redirect('error')

    except Exception as e:
        print(f"Error al crear la transacción: {e}")
        return redirect('error')


@csrf_exempt
def confirmar_pago(request):
    token = request.GET.get('token_ws')

    if not token:
        return redirect('error')

    # Configurar la transacción con las claves
    transaction = Transaction(WebpayOptions(
        commerce_code=TRANSBANK_COMMERCE_CODE,
        api_key=TRANSBANK_API_KEY,
    ))

    try:
        # Confirmar la transacción con el token
        response = transaction.commit(token)

        print(f"Respuesta de confirmación: {response}")  # Imprimir la respuesta para depuración

        # Verificar si la transacción fue autorizada
        if response['status'] == 'AUTHORIZED':
            context = {
                'monto_total': response['amount'],
                'orden_id': response['buy_order'],
                'fecha_transaccion': response['transaction_date']
            }
            return render(request, 'confirmacion_pago.html', context)
        else:
            # Si la transacción no es autorizada, redirigir a error
            print(f"Transacción no autorizada. Estado: {response['status']}")
            return redirect('error')

    except Exception as e:
        print(f"Error al confirmar el pago: {e}")
        return redirect('error')

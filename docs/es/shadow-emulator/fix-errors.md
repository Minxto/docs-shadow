# Corregir errores

<div class="gb-notice gb-notice--info">

**Recordatorio importante**

Debes seleccionar la región de tu cuenta al iniciar el emulador. De lo contrario, podrías recibir errores **VAL-5**.

</div>

## Vanguard pide un reinicio. ¿Qué debo hacer?

![Reinicio de Vanguard requerido](/images/vanguard-restart.png)

Nuestro emulador está diseñado **100% para ayudarte a evitar baneos**, por lo que es normal que a veces Vanguard permanezca cerrado así. Tenemos una técnica para ti: abre el **Símbolo del sistema como administrador** y ejecuta los siguientes comandos:

```bat
sc stop vgc
sc stop vgk
sc start vgc
sc start vgk
```

## Recibo un error VAL-5 después de terminar una partida. ¿Qué debo hacer?

Es normal. Al final de cada partida, debes presionar **F3** y esperar 10–20 segundos para que el estado del emulador cambie de «Esperando» a «Conectado».

## Obtuve un error VAL-102. ¿Qué lo causó?

Estás spameando demasiado la aplicación y el tiempo de espera de reinicio, lo que activa un límite de tasa en tu acceso a Riot. Simplemente espera entre **5 y 30 minutos** antes de intentarlo de nuevo. Cuanto más spamees y fuerces, más durará el límite de tasa.

## La aplicación se cierra de repente y no puedo abrirla de nuevo. ¿Qué debo hacer?

Reinicia tu computadora para restaurar Vanguard a su versión predeterminada, luego inicia el emulador de nuevo.

## MFA muestra «Failed» cuando intento usarlo. ¿Qué debo hacer?

Asegúrate de estar en el **lobby** al activarlo. Solo debes usar esta opción cuando MFA sea realmente solicitado — de lo contrario, es innecesario y puede fallar.

## Cuando inicio la aplicación, me dice que cambie de aplicación después de una actualización. ¿Qué debo hacer?

Sí — ve al Discord oficial o consulta la sección **Tutorial** de este sitio para instalar la última versión disponible. Las versiones antiguas están obsoletas. Incluso si intentas evitar la actualización, corres el riesgo de ser baneado.

## Tengo un error VAN-79. ¿Qué debo hacer?

Debes configurar el reloj de tu PC para que se actualice automáticamente. En la esquina inferior derecha de la barra de tareas, haz clic derecho en el reloj, abre **Ajustar fecha y hora** y activa **Establecer la hora automáticamente**.

## Recibí VAL-5 y un baneo temporal en mi cuenta. ¿Es normal?

Sí. Si usas mal el emulador, ya no se carga correctamente a través de Riot y puedes recibir un baneo. Este baneo es **temporal** y suele durar solo **5 a 10 minutos** antes de poder volver a jugar.

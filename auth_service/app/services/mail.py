from fastapi import BackgroundTasks
from app.config.settings import settings
from app.config.mail import send_email
import smtplib



async def send_successful_account_creation_mail(user, background_tasks):
    data = {
        'app_name': settings.APP_NAME,
        "name": user.username,
        'login_url': f'{settings.FRONTEND_HOST}'
    }
    subject = f"Welcome - {settings.APP_NAME}"
    await send_email(
        recipients=[user.email],
        subject=subject,
        template_name="successful_account_creation_mail.html",
        context=data,
        background_tasks=background_tasks
    )

# async def send_successful_account_creation_mail():

#     sender = "anilpatra927@gmail.com"
#     receiver = "y143pradhan@gamil.com"

#     message = f"""\
#     Subject: Hi Mailtrap
#     To: {receiver}
#     From: {sender}

#     This is a test e-mail message."""

#     with smtplib.SMTP("sandbox.smtp.mailtrap.io", 2525) as server:
#         server.starttls()
#         server.login("c111559c3fb99e", "4a0ab0ccd3928c")
#         server.sendmail(sender, receiver, message)







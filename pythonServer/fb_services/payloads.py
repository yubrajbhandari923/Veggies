from fb_services.config import APP_URL

get_started_payload = { # GET STARTED POSTBACK PAYLOAD
    "template_type" :"generic",
    "elements" : [
        {
            "title" : "Welcome to Veggies Market",
            "subtitle" : "Connect with generic farmers in your locality.",
            "image_url" : f"https://www.messenger.com/messenger_media/?thread_id=102208592487070&attachment_id=1842344112642060&message_id=mid.%24cAAAGBimqpviGqljVVmAeROGSaEA8",
            "buttons" : [{
                "type" : "postback",
                "title" : "Yes",
                "payload" : "yes"
            }]

        }
    ]
}

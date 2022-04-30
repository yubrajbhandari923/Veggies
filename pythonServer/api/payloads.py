from fb_services.config import APP_URL

Welcome_payload = {
    "template_type" :"generic",
    "elements" : [
        {
            "title" : "Welcome to Veggies Market",
            "subtitle" : "Connect with generic farmers in your locality.",
            "image_url" : f"{APP_URL}/static/img/welcome.jpg",
            "buttons" : [{
                "type" : "postback",
                "title" : "Yes",
                "payload" : "yes"
            }]

        }
    ]
}
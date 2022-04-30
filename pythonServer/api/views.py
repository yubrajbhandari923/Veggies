import os, json
from django.shortcuts import render
from django import http
from django.views import View
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response

from fb_services.profile import Profile
from fb_services.config import *
from fb_services.FBAPI import callNLPConfigsAPI, callSendAPI

from fb_services.payloads import get_started_payload


class WebHookView(View):
    def handleMessage(self, sender_psid, recieved_message):

        print(f"\n\n Recieved Message {recieved_message} by {sender_psid} ")

        res = {  # Response Object
            "messaging_type": "RESPONSE",
            "recipient": {"id": str(sender_psid)},
            "message": {},
        }

        if recieved_message.get("text"):
            text = recieved_message.get("text")
            try:
                wit_greeting = (
                    recieved_message.get("nlp").get("traits").get("wit$greetings")[0]
                )

                # if (
                #     wit_greeting
                #     and wit_greeting.get("value") == True
                #     and wit_greeting.get("confidence") >= 0.9
                # ):
                    # res["message"]["attachment"] = {
                    #     "type": "template",
                    #     "payload": {
                    #         "template_type": "generic",
                    #         "elements": [
                    #             {
                    #                 "title": "Welcome to Veggies Market",
                    #                 "subtitle": "Connect with generic farmers in your locality.",
                    #                 "image_url": f"{APP_URL}/static/img/welcome.jpg",
                    #                 "buttons": [
                    #                     {
                    #                         "type": "postback",
                    #                         "title": "Yes",
                    #                         "payload": "yes",
                    #                     }
                    #                 ],
                    #             }
                    #         ],
                    #     },
                    # }
                print("\n\n Hellooooooooooooooooooo \n\n\n")
                res["message"]["attachment"] = {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": [
                                {
                                    "title": "Is this the right picture?",
                                    "subtitle": "Tap a button to answer.",
                                    "image_url": f"{APP_URL}/static/img/welcome.jpg",
                                    "buttons": [
                                        {
                                            "type": "postback",
                                            "title": "Yes!",
                                            "payload": "yes",
                                        },
                                        {
                                            "type": "postback",
                                            "title": "No!",
                                            "payload": "no",
                                        },
                                    ],
                                }
                            ],
                        },
                    }
            except Exception:
                res["message"]["text"] = "You are a nice lady "

            # res["message"]["text"] = f"You send the message {recieved_message.get('text')} "

        if recieved_message.get("attachments"):
            url_ = recieved_message.get("attachments")[0]["payload"]["url"]
            # res["message"]["text"] = f"URL : {url_} "

            res["message"]["attachment"] = {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url":f"{APP_URL}/static/img/welcome.jpg",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes",
                                },
                                {
                                    "type": "postback",
                                    "title": "No!",
                                    "payload": "no",
                                },
                            ],
                        }
                    ],
                },
            }

        response = callSendAPI(res)

        print(f"\nHandle Messege\n {response.status_code} : {response.text} ")

    def handlePostback(self, sender_psid, recieved_postback):
        res = {  # Response Object
            "messaging_type": "RESPONSE",
            "recipient": {"id": str(sender_psid)},
            "message": {},
        }

        payload = recieved_postback["payload"]

        if payload == "yes":
            callSendAPI(reqBody)

        if payload == "GET_STARTED" :
            res["message"]["attachment"] = {
                "type": "template",
                "payload" : get_started_payload
            }
            response = callSendAPI(res)
            print(f"\nHandle Postback\n {response.status_code} : {response.text} ")

            res1 ={
                 "messaging_type": "RESPONSE",
                "recipient": {"id": str(sender_psid)},
            }
            res1["message"]["text"] = "Here you can order Vegetables from farmers nearby you."
            response = callsendAPI(res1)

            res2 ={
                            "messaging_type": "RESPONSE",
            "recipient": {"id": str(sender_psid)},

            }
            res2["message"]["attachment"] = {
                "type" : "template",
                "payload": {
                    "template_type" : "generic",
                    "elements": [{
                        "title" : "Cabbage",
                        "image_url" : f"{APP_URL}/static/img/cabbage.jpg",
                        "buttons" : [
                            {
                                "type":"postback",
                                "title": "Order",
                                "payload": "ORDER_CABBAGE",
                            }
                        ]  
                    },{
                        "title" : "Potatoes",
                        "image_url" : f"{APP_URL}/static/img/potato.jpg",
                        "buttons" : [
                            {
                                "type":"postback",
                                "title": "Order",
                                "payload": "ORDER_POTATO",
                            }
                        ]  
                    },{
                        "title" : "Beans",
                        "image_url" : f"{APP_URL}/static/img/beans.jpg",
                        "buttons" : [
                            {
                                "type":"postback",
                                "title": "Order",
                                "payload": "ORDER_BEANS",
                            }
                        ]  
                    },{
                        "title" : "Egg Plant",
                        "image_url" : f"{APP_URL}/static/img/eggplant.jpg",
                        "buttons" : [
                            {
                                "type":"postback",
                                "title": "Order",
                                "payload": "ORDER_EGGPLANT",
                            }
                        ]  
                    }]
                }
            }

            response = callSendAPI(res2)
        
        if payload[:5] == "ORDER":
            res3 = {
                            "messaging_type": "RESPONSE",
            "recipient": {"id": str(sender_psid)},

            }
            res3["message"]["attachments"] = {
                "type": "template",
                "payload" : {
                    "template_type": "button",
                    "text": "Please Select your Location: ",
                    "buttons": [
                        {"type": "postback", "title": "Kathmandu","payload": "LIST_FARMERS"},
                        {"type": "postback", "title": "Banglore","payload": "LIST_FARMERS"},
                        {"type": "postback", "title": "Butwal","payload": "LIST_FARMERS"},
                        {"type": "postback", "title": "Mustang","payload": "LIST_FARMERS"},
                    ]
                }
            }

            response = callSendAPI(res3)
        
        if payload == "LIST_FARMERS":
            res["message"]["text"] = ""
            res["message"]["attachments"] = {
                "type": "template",
                "payload" : {
                    "template_type" : "generic",
                    "elements": [{
                        "title": "Farmer 1",
                        "subtitle": "Price: Rs100/kg"
                        ""
                    }]
                }
            }

    def callSendAPI(self, sender_psid, response):
        pass

    def get(self, req, format=None):
        """Verify our webhook."""

        challenge = req.GET.get("hub.challenge")
        if (
            req.GET.get("hub.verify_token") == VERIFY_TOKEN
            and req.GET.get("hub.mode") == "subscribe"
        ):
            print(
                f"\n\n WEBHOOK VERIFIED: {challenge} : {req.GET.get('hub.challenge')} \n\n"
            )
            return HttpResponse(challenge)
        return HttpResponseForbidden()

    @csrf_exempt
    def post(self, req, format=None):
        """{"object":"page",
        "entry":[{"id":"102208592487070","time":1651280540163,
            "messaging":[{"sender":{"id":"7623554920995436"},"recipient":{"id":"102208592487070"},
                        "timestamp":1651279490554,
                        "message":{"mid":"m_iYu3nxv5U5_x7Bya7L7WduoUYteJVLlbATqo_SN5H3iXABalKc_KbzpENA-C9B37g8ZtO2UU7rrJx4f_gY8Dcg",
                           "text":"Hello",
                            "nlp":{"intents":[],"entities":{},"traits":{"wit$sentiment":[{"id":"5ac2b50a-44e4-466e-9d49-bad6bd40092c","value":"positive","confidence":0.5435}],
                            "wit$greetings":[{"id":"5900cc2d-41b7-45b2-b21f-b950d3ae3c5c","value":"true","confidence":0.9998}]},
                            "detected_locales":[{"locale":"en_XX","confidence":0.5776}]}}}]}]}"""

        print(f"\n\n Recieved Webhook: {req.body} \n")

        body = json.loads(req.body)
        if body.get("object") == "page":

            for entry in body["entry"]:
                # if "changes" in entry:
                webhook_event = entry["messaging"][0]
                print(f"\n\n {entry['messaging'][0]} \n\n")

                sender_psid = webhook_event["sender"]["id"]
                print(f"\n\n Sender PSID {sender_psid} \n\n")

                if webhook_event.get("message"):
                    message = webhook_event.get("message")
                    self.handleMessage(sender_psid, message)

                elif webhook_event.get("postback"):
                    postback = webhook_event.get("postback")
                    self.handlePostback(sender_psid, postback)

            return HttpResponse("EVENT_RECIEVED")

        return HttpResponse("RECIEVED")


class ProfileView(APIView):
    def get(self, req, format=None):
        """/profile?"""

        print(f"\n\n {req.query_params} \n\n")
        token = req.query_params.get("verify_token", None)
        mode = req.query_params.get("mode", None)

        profile = Profile()
        responseBody = ""
        if mode and token:
            if token == os.environ.get("VERIFY_TOKEN"):
                if mode == "webhook" or mode == "all":
                    profile.setWebhook()
                    print("\n\n Web Hook Set \n\n")
                    responseBody += f"Set App {APP_ID} set to {WEBHOOK_URL} \n"
                if mode == "profile" or mode == "all":
                    profile.setThread()
                    print("\n\n Profile thread Set \n\n")
                    responseBody += f"Set Messenger Profile of PAGE {PAGE_ID} \n"
                if mode == "persona" or mode == "all":
                    profile.setPersonas()
                    print("\n\n Set Persona \n\n")
                    responseBody += f"Set Personas for {APP_ID} \n"
                if mode == "nlp" or mode == "all":
                    callNLPConfigsAPI()
                    print("\n\n Set NLP \n\n")
                    responseBody += f"Enabled Build in NLP for {PAGE_ID} \n "
                if mode == "domains" or mode == "all":
                    profile.setWhitelistedDomains()
                    print("\n\n Set Domains \n\n")
                    responseBody += f"WhitListed Domains Set for {PAGE_ID} \n"
                if mode == "private-reply":
                    profile.setPageFeedWebhook()
                    print("\n\n Set Privaet reply \n\n")
                    responseBody += f"Set Page Body WebHook"

                return Response(responseBody, status=200)
            return Response(status=403)
        return Response(status=404)

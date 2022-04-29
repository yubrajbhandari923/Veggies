import os
from django.shortcuts import render
from django import http

from rest_framework.views import APIView 
from rest_framework.response import Response

from fb_services.profile import Profile
from fb_services.config import *
from fb_services.FBAPI import callNLPConfigsAPI

VERIFY_TOKEN = os.environ["VERIFY_TOKEN"]


class WebHookView(APIView):
    def get(self, req, format=None):

        """Verify our webhook."""
        if req.query_params.get("hub.verify_token") == VERIFY_TOKEN and req.query_params.get("hub.mode") == "subscribe":
            print("\n\n WEBHOOK VERIFIED \n\n")
            return req.query_param.get("hub.challenge") 
        return Response(status=403)

    def post(self,req,format=None):
        print(f"\n\n Recieved Webhook: {req.data} \n")
        
        if req.data["object"] == "page":
            
            for entry in req.data["entry"]:
                # if "changes" in entry:
                print(f"\n\n {entry['messaging'][0]} \n\n")
                return Response('EVENT_RECIEVED', status=200) 

        return Response(status=400)

class ProfileView(APIView):
    def get(self, req, format=None):
        """/profile?  """

        print(f"\n\n {req.data} \n\n")
        token = req.query_params.get('token', None)
        mode = req.query_params.get('mode', None)

        profile = Profile()
        responseBody = ""
        if mode and token:
            if token == os.environ.get("VERIFY_TOKEN"):
                if mode == "webhook" or mode == "all":
                   profile.setWebHook()
                   responseBody += f"Set App {APP_ID} set to {WEBHOOK_URL} \n"
                if mode == "profile" or mode == "all":
                    profile.setThread()
                    responseBody += f"Set Messenger Profile of PAGE {PAGE_ID} \n"
                if mode == "persona" or mode == "all":
                    profile.setPersonas()
                    responseBody += f"Set Personas for {APP_ID} \n"
                if mode == "nlp" or mode == "all":
                    callNLPConfigsAPI()
                    responseBody += f"Enabled Build in NLP for {PAGE_ID} \n "
                if mode == "domains" or mode == "all":
                    profile.setWhitelistedDomains()
                    responseBody += f"WhitListed Domains Set for {PAGE_ID} \n"
                if mode == "private-reply":
                    profile.setPageFeedWebhook()
                    responseBody += f"Set Page Body WebHook"
                
                return Response(responseBody, status=200)
            return Response(status=403)
        return Response(status=404)
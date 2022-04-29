import os
from django.shortcuts import render
from django import http
from django.views import View
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrfexempt

from rest_framework.views import APIView 
from rest_framework.response import Response

from fb_services.profile import Profile
from fb_services.config import *
from fb_services.FBAPI import callNLPConfigsAPI



VERIFY_TOKEN = os.environ["VERIFY_TOKEN"]


class WebHookView(View):
    def get(self, req, format=None):
        """Verify our webhook."""

        challenge = req.GET.get('hub.challenge')
        if req.GET.get("hub.verify_token") == VERIFY_TOKEN and req.GET.get("hub.mode") == "subscribe":
            print(f"\n\n WEBHOOK VERIFIED: {challenge} : {req.GET.get('hub.challenge')} \n\n")
            return HttpResponse(challenge) 
        return HttpResponseForbidden()

    @csrfexempt
    def post(self,req,format=None):
        print(f"\n\n Recieved Webhook: {req.data} \n")
        
        if req.data["object"] == "page":
            
            print(f"\n\n{req.data} \n\n ")

            for entry in req.data["entry"]:
                # if "changes" in entry:
                print(f"\n\n {entry['messaging'][0]} \n\n")
                return Response('EVENT_RECIEVED', status=200) 

        return Response(status=403)

class ProfileView(APIView):
    def get(self, req, format=None):
        """/profile?  """

        print(f"\n\n {req.query_params} \n\n")
        token = req.query_params.get('verify_token', None)
        mode = req.query_params.get('mode', None)

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
import os
from django.shortcuts import render
from django import http

from rest_framework.views import APIView 
from rest_framework.response import Response


VERIFY_TOKEN = os.environ["VERIFY_TOKEN"]


class WebHookView(APIView):
    def get(self, req, format=None):

        """Verify our webhook."""
        if req.data.get("hub.verify_token") == VERIFY_TOKEN and req.data.get("hub.mode") == "subscribe":
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
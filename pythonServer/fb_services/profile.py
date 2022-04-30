from .FBAPI import *
from .config import *
from .payloads import get_started_payload

class Profile:
    def setWebhook(self):
        print(callSubscriptionAPI())
        print(callSubscribedApps())

    @property
    def getGetStarted(self):
        """ """
        return {"payload": get_started_payload}

    @property
    def getGreeting(self):
        """JS Implementation has some complex transaltion with locales.
        TODO: Make this function similiar to JS(original-coast-clothing demo app) to enable translations
        """
        return [
            {"locale": "default", "text": "profile.greeting"},
        ]

    @property
    def getPersistanceMenu(self):
        return [
            {
                "locale": "default",
                "composer_input_disabled": False,
                "call_to_actions": [
                    {
                        "title": "menu.restart",
                        "type": "postback",
                        "payload": "GET_STARTED",
                    },
                ]
            }
        ]

    def setThread(self):
        """Sets the profile like Get Started page, Default Greeting when get started is clicked and Persistent Menu"""
        profilePayload = {
            "get_started": self.getGetStarted,
            "greeting" : self.getGreeting,
            "persistent_menu": self.getPersistanceMenu
        }

        print(callMessengerProfileAPI(profilePayload))

    def setPersonas(self):
        newPersonas = NEW_PERSONAS

        personas = getPersonaAPI()

        if not personas.get("_Error", None):
            for persona in personas:
                PUSH_PERSONA({"name":persona["name"], "id": persona["id"]})
        
            existingPersonas = PERSONAS

            for persona in newPersonas:
                if not (persona["name"] in existingPersonas):
                    personaID = postPersonaAPI(persona["name"], persona["picture"])

                    if type(personaID) == int:
                        PUSH_PERSONA({"name": persona["name"], "id": personaID})

    def setWhitelistedDomains(self):
        payload = {"whitelisted_domains": WHITELISTED_DOMAINS}

        callMessengerProfileAPI(payload)

    def setPageFeedWebhook(self):
        callSubscriptionAPI('feeds')
        callSubscribedApps('feeds')
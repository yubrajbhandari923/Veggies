from .FBAPI import *
from .config import *

class Profile:
    def setWebhook(self):
        callSubscriptionAPI()
        callSubscribedApps()

    @property
    def getGetStarted(self):
        return {"payload": "GET_STARTED"}

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
                        "title": "menu.order",
                        "type": "postback",
                        "payload": "TRACK_ORDER",
                    },
                    {
                        "title": "menu.help",
                        "type": "postback",
                        "payload": "CARE_HELP",
                    },
                    {
                        "title": "menu.suggestion",
                        "type": "postback",
                        "payload": "CURATION",
                    },
                    {
                        "type": "web_url",
                        "title": "menu.shop",
                        "url": SHOP_URL,
                        "webview_height_ratio": "full",
                    },
                ],
            }
        ]

    def setThread(self):
        profilePayload = {
            "get_started": self.getGetStarted,
            "greeting" : self.getGreeting,
            "persistent_menu": self.getPersistanceMenu
        }

        callMessengerProfileAPI(profilePayload)

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
# ISA-IPA-2023-01-01-ISY5005-GRPPREV-Xtract

## SECTION 1 : Xtract
## NUS ISS Intelligent Process Agent
<img src="Images/chatbot.png"
     style="float: left; margin-right: 0px;" />

<br>


## SECTION 2 : EXECUTIVE SUMMARY / PAPER ABSTRACT



## SECTION 3 : CREDITS / PROJECT CONTRIBUTION

| Official Full Name  | Student ID (MTech Applicable)  | Work Items (Who Did What) | Email (Optional) |
| :------------ |:---------------:| :-----| :-----|
| LIM LI WEI | A0087855L | Refer to individual report | E0319479@u.nus.edu |
| PREM CHANDRAN | A0195324A | Refer to individual report | E0384955@u.nus.edu |
| YONG QUAN ZHI, TOMMY | A0195353Y | Refer to individual report | E0384984@u.nus.edu |

## SECTION 4 : VIDEO OF SYSTEM MODELLING & USE CASE DEMO

[SARA AIRBNB AGENT MARKETING VIDEO](https://www.youtube.com/watch?v=t1rJmW_MT9A)

[SARA AIRBNB AGENT DEMO VIDEO](https://youtu.be/UsykrTc72yw)

## SECTION 5 : USER GUIDE

[Download the user guide](http://tiny.cc/q2m5nz)

For a more detailed look at user guide, please refer to appendix 1 of the report for the user guide. 

Please ensure you are using python 3.6 or higher.
Once you have downloaded and unzipped the project file, CD into your project root folder "<your-file-path>/ISA-IPA-2020-03-21-IS01PT-GRP-Etika-SARA_AirbnbAgent/SystemCode"

**Step 1**. Create a python env.
"python3 -m venv env" OR use "python -m venv env"

**Step 2**. Activate the python env. You should see (env) next to your command line.
For Mac: "source env/bin/activate"
For Windows: "env\Scripts\activate"

**Step 3**. In the command prompt/terminal CD to the project folder "<your-file-path>/ISA-IPA-2020-03-21-IS01PT-GRP-Etika-SARA_AirbnbAgent/SystemCode”. Enter "pip install -r requirements.txt" OR "pip3 install -r requirements.txt".  This will install all the required dependencies.

**Step 4**. Once installation is complete, enter " flask run". This will deploy your server locally on your pc.

**Step 5**. You need to open a channel to your computer so that dialogflow and the telegram bot can communicate with your server. To do this, we will use ngrok. With a new command prompt/terminal CD to the project root folder "<your-file-path>/ISA-IPA-2020-03-21-IS01PT-GRP-Etika-AirbnbAgent". There will be an "ngrok_win" and an "ngrok_mac" file. Rename the file with your OS in use to just "ngrok". E.g If you are using Windows, delete the "_win" from "ngrok_win".
From your command prompt, enter "ngrok http localhost:5000".
Take note of the https link. It should look something like this "https://f34bb6f6.ngrok.io". Take note of this link.

**Step 6**. Go to https://dialogflow.cloud.google.com/ and log in with your account. Proceed to iImport the dialogflow agent(IPA-AIRBNB.zip) on dialogflow.
To do this, first create a new agent and give it a name e.g. "AIRBNB AGENT".
Once created click on the settings gear icon next the agent name and click the "Export and Import" tab.
Click "Import From Zip" and select the IPA-AGENT zip file. Type in "IMPORT" into the text box and click "IMPORT".

**Step 7**. Once the agent has been imported and training is done, click on the "Fulfillment" option on the left menu bar. Enable the webhook(If it is not enabled), and copy and paste the ngrok https link on the URL field. Add in "/get_recommendations" right at the end of the ngrok link. Scroll to the bottom and click save. Give it some time to save your settings.

**Step 8**. Set up the link between telegram and dialogflow. From dialogflow, click Integrations. Check the Telegram box. A pop-up will appear, enter the bot_token key and click start. This will integrate the bot and dialogflow together.

**Step 9**. Now open up your telegram app from the smartphone. From the search bar of your chat page, type "IPAAIRBNBBot" click on “IPA-AIRBNB-BOT”. A chat window will be created with the bot, click 'Start'. You can now test sending some search queries such as "Can you find some recommendations for 2 adults, 1 child and 1 infant to stay in Vienna from 5th June to 17th June?". Alternatively, you can open the conversation with “Can you find me some recommendations” and the chatbot will proceed to ask you necessary questions before searching on Airbnb for your recommendations.

**Additional notes**: You can also test dialogs from the google assistant via the dialogflow website located on the right side of the screen.

-----------------------------------------------------------------------------------------------------

## SECTION 6 : PROJECT REPORT / PAPER

[Download the Project Report](http://tiny.cc/q2m5nz)

## SECTION 7 : MISCELLANEOUS

-----

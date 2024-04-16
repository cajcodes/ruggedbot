![RuggedEdge Logo](logo.svg)

# RuggedEdge AI Helpdesk

The RuggedEdge AI Helpdesk is a simple web-based chat interface that allows users to interact with our support system powered by advanced language models. This implementation includes frontend code to handle UI elements such as input forms and message containers, along with JavaScript logic for handling user interactions and communication with our backend services.

## Features
* User-friendly conversational interface for seeking assistance related to RuggedEdge products and solutions.
* Integration with RuggedFunctions repository containing backend functions responsible for processing user requests and generating accurate, contextually relevant responses.
* Responsive design optimized for desktop and mobile viewing experiences.
* Utilization of popular libraries including Showdown (for markdown parsing) and Axios (for HTTP client functionality).

## Usage
Users can engage with the RuggedEdge AI Helpdesk by simply entering their queries into the provided text input area and pressing the Send button. The system will then generate an appropriate response based on available information from our knowledge base and other resources.

To see this project in action, visit [our website](https://www.ruggededge.ai/support).

## Dependencies
This implementation relies on several external dependencies hosted via CDN networks:
* Showdown v1.9.1: A library used for parsing markdown syntax and rendering it as HTML.
* Axios v0.27.2: An extensible promise-based HTTP client capable of making POST requests to our backend API endpoints.

## Backend Functions
The backend logic required for our project relies on the following shared Firebase Cloud Functions: <https://github.com/cajcodes/rugged-functions>. It provides essential functionalities including integration with OpenAI's API for conversational AI capabilities utilizing their GPT models. Refer to the linked repository for detailed documentation and usage guidelines.

## Credits
* Developed by Christopher Jones
* AI assistant powered by OpenAI

## License
Proprietary - Copyright © RuggedEdge. All rights reserved.

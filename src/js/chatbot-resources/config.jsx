import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import BotOptions from '../../components/chatbot/BotOptions';
import BotLinks from '../../components/chatbot/BotLinks';
const config = {
  /*  1.We created the LearningOptions component.
  2.We registered the component under widgets in our config.
  3.We gave the createChatbotMessage function an options object specifying which
   widget to render with this message.t a name and changed the color of the messagebox
    and chatbutton components.
 */
  botName: 'EdulaneBot',

  initialMessages: [
    createChatBotMessage("Hi Friend!!, I'm here to help. What do you want to 		learn?", {
      widget: 'LearningOptions'
    })
  ],

  //We are using the Widgets inside the config file and this allows us room to decorate the widget with important properties inside the chatbot
  widgets: [
    {
      widgetName: 'LearningOptions',
      widgetFunc: props => <BotOptions {...props} />
    },
    {
      widgetName: 'javascriptLinks',
      widgetFunc: props => <BotLinks {...props} />,
      props: {
        options: [
          {
            text: 'Introduction to JS',
            url:
              'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/',
            id: 1
          },
          {
            text: 'Mozilla JS Guide',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
            id: 2
          },
          {
            text: 'Frontend Masters',
            url: 'https://frontendmasters.com',
            id: 3
          }
        ]
      }
    },

    {
      widgetName: 'ReactJS',
      widgetFunc: props => <BotLinks {...props} />,
      props: {
        options: [
          {
            text: 'Introduction to ReactJS',
            url: 'https://reactjs.org/tutorial/tutorial.html',
            id: 1
          },
          {
            text: 'React projects',
            url:
              'https://dev.to/nerdjfpb/15-react-js-project-ideas-beginner-to-expert-with-free-tutorial-f41',
            id: 2
          },
          {
            text: 'React Realworld projects',
            url:
              'https://medium.com/front-end-weekly/5-real-world-react-projects-to-inspire-growth-no-todo-apps-allowed-8c5b6cffbadd',
            id: 3
          }
        ]
      }
    },
    {
      widgetName: 'machinelearning',
      widgetFunc: props => <BotLinks {...props} />,
      props: {
        options: [
          {
            text: 'Introduction to MachineLearning',
            url:
              'http://www.neodev.se/article/an-introduction-to-neural-networks-and-machine-learning/',
            id: 1
          },
          {
            text: 'ML',
            url:
              'https://www.researchgate.net/publication/303806260_Machine_Learning_Algorithms_and_Applications',
            id: 2
          },
          {
            text: 'ML Realworld projects',
            url: 'https://www.springboard.com/blog/machine-learning-projects/',
            id: 3
          }
        ]
      }
    },
    {
      widgetName: 'apis',
      widgetFunc: props => <BotLinks {...props} />,
      props: {
        options: [
          {
            text: 'REST APIS',
            url: 'https://www.sitepoint.com/developers-rest-api/',
            id: 1
          },
          {
            text: 'REACT API',
            url: 'https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/',
            id: 2
          },
          {
            text: 'Web Services Api',
            url: 'https://www.guru99.com/webservice-testing-beginner-guide.html',
            id: 3
          }
        ]
      }
    }
  ]
};

export default config;

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
  botName: 'EduBot',

  initialMessages: [
    createChatBotMessage(
      "Hi, I'm here to help. Here are some extra resources for the following subjects.",
      {
        widget: 'LearningOptions'
      }
    )
  ],

  //We are using the Widgets inside the config file and this allows us room to decorate the widget with important properties inside the chatbot
  widgets: [
    {
      widgetName: 'LearningOptions',
      widgetFunc: props => <BotOptions {...props} />
    },
    {
      widgetName: 'biology',
      widgetFunc: props => <BotLinks {...props} />,
      props: {
        options: [
          {
            text: 'Photosynthesis',
            url: 'https://www.youtube.com/watch?v=fTXh7A7Uc2M',
            id: 1
          },
          {
            text: 'Heart Structure',
            url:
              'https://aklectures.com/lecture/cardiovascular-system/structure-of-the-heart',
            id: 2
          },
          {
            text: 'Genome',
            url: 'https://www.genome.gov/genetics-glossary/Deoxyribonucleic-Acid',
            id: 3
          },
          {
            text: 'Microbes',
            url: 'https://learn.genetics.utah.edu/content/microbiome/intro/',
            id: 4
          }
        ]
      }
    },
    {
      widgetName: 'chemistry',
      widgetFunc: props => <BotLinks {...props} />,
      props: {
        options: [
          {
            text: 'Atomic Structure',
            url:
              'https://courses.lumenlearning.com/boundless-chemistry/chapter/the-structure-of-the-atom/#:~:text=Atoms%20consist%20of%20three%20basic,the%20electrons%20(negatively%20charged)',
            id: 1
          },
          {
            text: "Bohr's Model",
            url: 'https://www.youtube.com/watch?v=S1LDJUu4nko',
            id: 2
          },
          {
            text: 'Periodic Table',
            url:
              'https://www.acs.org/content/acs/en/education/students/highschool/chemistryclubs/activities/periodic-table.html',
            id: 3
          },
          {
            text: 'Thermodynamics',
            url:
              'https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_Chemistry_-_The_Central_Science_(Brown_et_al.)/19%3A_Chemical_Thermodynamics',
            id: 4
          }
        ]
      }
    },
    {
      widgetName: 'physics',
      widgetFunc: props => <BotLinks {...props} />,
      props: {
        options: [
          {
            text: 'Motion and forces',
            url: 'https://sciencetrek.org/sciencetrek/topics/force_and_motion/facts.cfm',
            id: 1
          },
          {
            text: 'Static & Kinetic Friction',
            url: 'https://www.youtube.com/watch?v=pL2YfC-22Uc',
            id: 2
          },
          {
            text: 'Gravity',
            url: 'https://www.youtube.com/watch?v=Kw51KiZhm0I',
            id: 3
          },
          {
            text: 'Quantum Physics',
            url: 'https://www.tcm.phy.cam.ac.uk/~bds10/aqp/lec1_compressed.pdf',
            id: 4
          }
        ]
      }
    }
  ]
};

export default config;

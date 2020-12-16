import React from 'react';

/* The learning options component should be registered with the config file.
We can create custom create learning options and render it to the page. */
const BotOptions = props => {
  const options = [
    {
      text: 'Biology',
      handler: props.actionProvider.handleJavascriptList,
      id: 1
    },
    {
      text: 'Chemistry',
      handler: props.actionProvider.ReactJS,
      id: 6
    },
    {
      text: 'Physics',
      handler: props.actionProvider.apis,
      id: 6
    }
    // { text: 'React JS', handler: () => {}, id: 2 },
    // { text: 'APIs', handler: () => {}, id: 3 },
    // { text: 'Material UI', handler: () => {}, id: 4 },
  ];

  const optionsMarkup = options.map(option => (
    <button className="learning-option-button" key={option.id} onClick={option.handler}>
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default BotOptions;

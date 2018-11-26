/* eslint-disable react/no-multi-comp */
import React from 'react';
import Survey from './containers/Survey';

export default {
  survey: {
    path: '/survey/:surveyID/:page?',
    render: (props) => <Survey {...props.match.params} />
  }
};

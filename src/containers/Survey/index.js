import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Icon, Grid, Header, Button, Segment, Statistic, Message} from 'semantic-ui-react';
import {requestSurvey, saveResponse} from '../../redux/survey/actions';
import * as selectors from '../../redux/survey/selectors';
import OccurencesGraph from '../../components/OccurencesGraph';
import SurveyQuestion from '../SurveyQuestion';
// import styles from './index.scss';

class Survey extends PureComponent {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    handleLoad: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    page: PropTypes.string,
    survey: PropTypes.object,
    surveyID: PropTypes.string.isRequired,
    totalStats: PropTypes.object
  };

  static defaultProps = {
    page: null,
    survey: null,
    totalStats: null
  }

  componentDidMount () {
    this.props.handleLoad();
  }

  renderTotalStats = () => {
    if (!this.props.totalStats) {
      return null;
    }

    const {userCount, average, occurrences} = this.props.totalStats;

    return <Grid.Row stretched={false} >
      <Grid.Column width={16}>
        <Header as='h3'>
          <Icon name='sitemap' />
          <Header.Content>
            Totals
          </Header.Content>
        </Header>
      </Grid.Column >
      <Grid.Column width={8}>
        <OccurencesGraph occurrences={occurrences} />
      </Grid.Column>
      <Grid.Column width={8} textAlign='justified'>
        <Statistic.Group widths={2}>
          <Statistic label='Participants' value={userCount} />
          <Statistic label='Average' value={average.toFixed(2)} />
        </Statistic.Group>
      </Grid.Column>
    </Grid.Row>;
  }

  render () {
    if (this.props.survey) {
      const questionIDs = Object.keys(this.props.survey.questions);
      const isCompleted = this.props.isSubmitted || this.props.page === 'results';

      return <Container>
        <br />
        <Header as='h1' attached='top'>{this.props.survey.title}</Header>
        <Segment attached={true}>
          <br />
          <Grid divided='vertically' stackable={true} >
            {isCompleted && this.renderTotalStats()}
            {questionIDs.map((questionID, questionIndex) => <SurveyQuestion
              key={questionID}
              questionID={questionID}
              questionIndex={questionIndex}
              isCompleted={isCompleted}
            />)}
          </Grid>
        </Segment>
        {this.props.errors?.submit && <Message negative={true} attached={true}>
          <Message.Header>Error while submitting your ratings</Message.Header>
          <p>{this.props.errors.submit.message}</p>
        </Message>}
        {!isCompleted && <Button
          loading={this.props.isSubmitting}
          onClick={this.props.handleSubmit}
          disabled={!this.props.isValid && !this.props.errors?.submit}
          positive={true}
          size='huge'
          attached='bottom'>SUBMIT</Button>}
        <br />
      </Container>;
    }
    if (this.props.errors?.request) {
      return <Container>
        <br />
        <Message warning={true} >
          <Message.Header>Error while retrieving survey {this.props.surveyID}</Message.Header>
          <p>{this.props.errors.request.message}</p>
        </Message>
      </Container>;
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  errors: selectors.getErrors(state),
  isValid: selectors.getIsValid(state),
  isSubmitting: selectors.getIsSubmitting(state),
  isSubmitted: selectors.getIsSubmitted(state),
  survey: selectors.getSurvey(state),
  totalStats: selectors.getTotalStats(state)
});

const mapDispatchToProps = (dispatch, {surveyID}) => ({
  handleLoad: () => dispatch(requestSurvey(surveyID)),
  handleSubmit: () => dispatch(saveResponse())
});

export default connect(mapStateToProps, mapDispatchToProps)(Survey);

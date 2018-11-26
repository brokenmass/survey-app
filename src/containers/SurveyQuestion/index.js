import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Icon, Grid, Header, Rating, Statistic} from 'semantic-ui-react';
import OccurencesGraph from '../../components/OccurencesGraph';
import * as selectors from '../../redux/survey/selectors';
import {addRating} from '../../redux/survey/actions';

class SurveyQuestion extends PureComponent {
  static propTypes = {
    handleRate: PropTypes.func.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
    questionIndex: PropTypes.number.isRequired,
    rating: PropTypes.number,
    stats: PropTypes.object.isRequired
  };

  static defaultProps = {
    rating: null
  };

  animationActive = false;

  renderQuestionStats = () => {
    if (!this.props.stats || !this.props.isCompleted) {
      return null;
    }
    const {average, standardDeviation, occurrences} = this.props.stats;

    return <>
      <Grid.Column width={8}>
        <OccurencesGraph occurrences={occurrences} />
      </Grid.Column>
      <Grid.Column width={8}>
        <Statistic.Group widths={2}>
          <Statistic label='Average' value={average.toFixed(2)} />
          <Statistic label='Std. Deviation' value={standardDeviation.toFixed(2)} />
          {this.props.rating && <Statistic >
            <Statistic.Value>
              <Rating disabled={true} icon='star' rating={3} maxRating={5} size='massive' />
            </Statistic.Value>
            <Statistic.Label>Your rating</Statistic.Label>
          </Statistic>}
        </Statistic.Group>
      </Grid.Column>
    </>;
  }

  render () {
    return <Grid.Row>
      <Grid.Column mobile={16} tablet={11} computer={12} largeScreen={13}>
        <Header as='h3'>
          <Icon name={this.props.question.icon} />
          <Header.Content>
            <Header.Subheader>Question {this.props.questionIndex + 1}</Header.Subheader>
            {this.props.question.title}
          </Header.Content>
        </Header>
      </Grid.Column >
      <Grid.Column mobile={16} tablet={5} computer={4} largeScreen={3}>
        {!this.props.isCompleted && <Rating
          icon='star'
          rating={this.props.rating}
          onRate={this.props.handleRate}
          maxRating={5} size='massive'
        />}
      </Grid.Column>
      {this.renderQuestionStats()}
    </Grid.Row>;
  }
}

const mapStateToProps = (state, {questionID}) => ({
  rating: selectors.getRating(state, questionID),
  stats: selectors.getQuestionStats(state, questionID),
  question: selectors.getQuestion(state, questionID)
});

const mapDispatchToProps = (dispatch, {questionID}) => ({
  handleRate: (event, {rating}) => dispatch(addRating({
    questionID,
    rating
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyQuestion);

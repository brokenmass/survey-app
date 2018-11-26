import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell, LabelList} from 'recharts';

class OccurencesGraph extends PureComponent {
  static propTypes = {
    colors: PropTypes.array,
    domain: PropTypes.array,
    height: PropTypes.number,
    occurrences: PropTypes.object.isRequired
  };

  static defaultProps = {
    colors: ['#FF2323', '#FF8042', '#FFBB28', '#00C49F', '#0088FE'],
    domain: [0, (dataMax) => Math.round((dataMax + 1) * 1.05)],
    height: 200
  }

  componentDidMount () {
    // the following horrible hack is needed to fix a bug in recharts that cause label
    // to not be rendered unless animation is (initially) disabled.
    if (!this.animationActive) {
      setTimeout(() => {
        this.animationActive = true;
      }, 1000);
    }
  }

  animationActive = false;

  render () {
    const data = Object.entries(this.props.occurrences)
      .map(([label, value]) => ({
        label,
        value
      }));

    return <ResponsiveContainer width='100%' height={this.props.height}>
      <BarChart data={data}>
        <XAxis dataKey='label' />
        <YAxis allowDecimals={false} domain={this.props.domain} />
        <Bar dataKey='value' isAnimationActive={this.animationActive}>
          <LabelList dataKey='value' position='top' />
          {data.map((entry, index) => <Cell key={`cell-${entry.value}`} fill={this.props.colors[index]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>;
  }
}

export default OccurencesGraph;

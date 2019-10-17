import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import { Col} from 'react-bootstrap';


export class StatsGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width:  0.3 * window.innerWidth,
          height: window.innerHeight
        }
    }

    updateDimensions = () => {
      if(window.innerWidth < 1200) {
        let update_width  = 0.3 * window.innerWidth;
        let update_height = 0.8 * Math.round(update_width);
        this.setState({ width: update_width, height: update_height });
      } else {
        let update_width  = 0.3 * window.innerWidth;
        let update_height = 0.8 * Math.round(update_width);
        this.setState({ width: update_width, height: update_height });
      }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
  
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {

        const { xData, yData, average, yTitle } = this.props; 

        var trace1 = {
            type: "scatter",
            mode: "lines+markers",
            name: yTitle,
            x: xData,
            y: yData,
            line: {
              color: "#17BECF"
            },
            marker: {
                color: "#2077b4",
                symbol: "hexagram"
            }
        };

        var trace2 = {
            mode: "lines",
            name: "Average" + name,
            x: xData,
            y: average,
            line: {
              color: "#fcb603"
            },
            marker: {
                color: "#2077b4",
                symbol: "hexagram"
            }
        };
      
        var data = [trace1, trace2];
      
        var layout = {
            width: this.state.width,
            height: this.state.height,       
            title: yTitle + " Distribution",
            xaxis: { title: 'Year' },
            yaxis: { title: yTitle, range: [0, Math.max(...yData)]},
            font: {size: 10, family: 'arial'},
            legend: {
                x: -0.1, 
                y: 1.2,
                font: {
                  size: 8,
                  family: 'arial'
                }
            }
        }

        return (
          <React.Fragment>
            <Col xs={4}>
              <Plot
                data={data}
                layout={layout}
              />
            </Col>
          </React.Fragment>
        );
      }
}
import React, { Component } from 'react';
import { Add } from './Add';
import { Sequences } from './Sequences';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedSequences: [
        {
          "sequenceDescription": "Cloning vector pUC-JK, complete sequence", 
          "sequenceName": "AF016541.1", "sequence": "TCGCGCGTTTCGGTGATGACGGTGAAAACCTCTGACACATG"
        },
        {
          "sequenceDescription": "Cloning vector pSport2, complete sequence", 
          "sequenceName": "U12391.1", "sequence": "CATTCGCCATTCAGGCTGCGCAACTGTCTACAGGGCGCGTC"
        },
        {
          "sequenceDescription": "Synthetic construct plasmid pUB1395, complete sequence", 
          "sequenceName": "MK178578.1", "sequence":
          "ACTGGCCGATAATTGCAGACGAACGGTGAGTAAGGAAAGAGTGAGGAACTATCGCATACCTGCATTTAAAGATGCTAGACTGA"
        },
        {
          "sequenceDescription": "Synthetic construct plasmid pUB1392, complete sequence", 
          "sequenceName": "MK178577.1", "sequence": "CACAGATGCGTAAGGAGAAAATACCGCATCAGGAAATTGTAAACAATACCG"
        },
        {
          "sequenceDescription": "Synthetic construct plasmid pUB1375, complete sequence", 
          "sequenceName": "MK178576.1", "sequence": "CACAGATGCGTAAGGAGAAAATACCGCATCAGGACCG"
        },
        {
          "sequenceDescription": "Synthetic construct plasmid pUB1004, complete sequence", 
          "sequenceName": "MK178575.1", "sequence": "ACGCGGCCGCCAGCTGAAGCTTCGTACGCTGCAGGTCGGTGACACTATAGA"
        },
        {
          "sequenceDescription": "Synthetic construct plasmid pUB972, complete sequence", 
          "sequenceName": "MK178574.1", "sequence": "CACAGATGCGTAAGGAGAAAATACCGCATATGCGGTGTGAAATACCG"
        },
        {
          "sequenceDescription": "Cloning vector pRSET6d (pBluescript KS plus derivative)", 
          "sequenceName": "X54209.1", "sequence": "GATCTCGATCCCGCGAAATTAATCAG"
        },
      ],
      view: ''
    };
    // TODO: load sequences directly from JSON file:
      // sequenceArray = sequences[0].sequences;
      // console.log((sequenceArray[0].sequenceName));
    this.displayComponent = this.displayComponent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reorder = this.reorder.bind(this);
    this.updateSequences = this.updateSequences.bind(this);
  }
  displayComponent(view) {
    // selects components to render
    let _this = this;
    setTimeout(function () {
      switch (view) {
        case 'link-to-add':
          _this.setState({ view:
            <Add
              onSubmit={_this.updateSequences}
              loadedSequences={_this.state.loadedSequences} />
          });
          break;
        case 'link-to-sequences':
          _this.setState({ view:
            <Sequences loadedSequences={_this.state.loadedSequences} onReorder={_this.reorder} />
          });
          break;
      }
    }, 5);
  }
  reorder(metadataProperty) {
    this.setState({ loadedSequences: 
      this.state.loadedSequences.sort((a, b) => 
        a[metadataProperty].localeCompare(b[metadataProperty]))
    });
  }
  updateSequences(newSequence) {
    // adds uploaded sequence to the current runtime
    this.setState({ loadedSequences:
      [newSequence, ...this.state.loadedSequences]
    });
    this.displayComponent('link-to-sequences');
  }
  // Event Handlers
  handleClick(e) {
    this.displayComponent(e.target.id);
  }
  // Lifecycle Methods
  componentDidMount() {
    this.displayComponent('link-to-add');
  }
  render() {
    return (
      <div>
        <header>~header and nav~</header>
        <nav>
          <button onClick={this.handleClick} id={"link-to-add"}>Add New</button>
          <button onClick={this.handleClick} id={"link-to-sequences"}>View All Sequences</button>
        </nav>
        {this.state.view}
      </div>
    );
  }
}

export default App;

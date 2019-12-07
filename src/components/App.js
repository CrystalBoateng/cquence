import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
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
    };
    // TODO: load sequences directly from JSON file:
      // sequenceArray = sequences[0].sequences;
      // console.log((sequenceArray[0].sequenceName));
    this.reorder = this.reorder.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateSequence = this.validateSequence.bind(this);
    this.changeNewSequence = this.changeNewSequence.bind(this);
  }
  reorder(metadataProperty) {
    this.setState({ loadedSequences: 
      this.state.loadedSequences.sort((a, b) => 
        a[metadataProperty].localeCompare(b[metadataProperty]))
    });
  }
  validateName(proposedName) {
    // TODO: check for duplicates; combine these two into one function
    console.log(proposedName);
    // this.setState({ newSequence: proposedSequence });

  }
  validateSequence(proposedSequence) {
    console.log(proposedSequence);
    // TODO: validate for real, then comine it into one function with validateName
    // checks for valid characters. breaks early if invalid.
    // checks for duplicates
    // displays errors to user
  }
  changeNewSequence(newSequence) {
    // adds uploaded sequence to the current runtime
    this.setState({ loadedSequences:
      [newSequence, ...this.state.loadedSequences]
    });
    // TODO: redirect user to the Sequences component
  }
  // Event Handlers
  // TODO: the events for the main two buttons on Home
  // Lifecycle Methods
  render() {
    return (
      <div>
        <header>~header and nav~</header>
        <Add
          onNameChange={this.validateName} 
          onSequenceChange={this.validateSequence}
          onSubmit={this.changeNewSequence} />
        <Sequences
          loadedSequences={this.state.loadedSequences}
          onReorder={this.reorder} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Add } from './Add';
import { Sequences } from './Sequences';
import './App.css';
let exampleJson = require('./../sequences/sequences.json').sequences;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedSequences: exampleJson,
      view: ''
    };
    this.displayComponent = this.displayComponent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reorder = this.reorder.bind(this);
    this.updateSequences = this.updateSequences.bind(this);
  }
  displayComponent(view) {
    // selects components to render
    let _this = this;
      setTimeout( () => {
      switch (view) {
        case 'link-to-add':
          _this.setState({ view:
            <Add
              onSubmit={_this.updateSequences}
              loadedSequences={_this.state.loadedSequences}
            />
          });
          break;
        case 'link-to-sequences':
          _this.setState({ view:
            <Sequences
              loadedSequences={_this.state.loadedSequences}
              onReorder={_this.reorder}
            />
          });
          break;
        default:
          //
      }
    }, 0);
  }
  reorder(metadataProperty) {
    this.setState({ loadedSequences:
      this.state.loadedSequences.sort((a, b) =>
        a[metadataProperty].localeCompare(b[metadataProperty]))
    });
    this.displayComponent('link-to-sequences');
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
    switch (e.target.name) {
      case 'backToTop':
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        break;
      default:
        this.displayComponent(e.target.id);
    }
  }
  // Lifecycle Methods
  componentDidMount() {
    this.displayComponent('link-to-sequences');
  }
  render() {
    return (
      <div>
        <header>
          <picture>
            <img src={"/img/logo.svg"} alt={"Double-helix icon"}/>
          </picture>
          <nav>
            <button onClick={this.handleClick} id={"link-to-add"}>
              Add New
            </button>
            <button onClick={this.handleClick} id={"link-to-sequences"}>
              View Sequences
            </button>
          </nav>
        </header>
        {this.state.view}
        <footer>
          <button onClick={this.handleClick} name="backToTop">
            Back to top
          </button>
          <div></div>
        </footer>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './Sequences.css';

export class Sequences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedSeq: {
        sequenceName: '',
        sequenceDescription: '',
        sequence: ''
      }
    };
    this.colorLetters = this.colorLetters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  applyLoadingDelay() {
    // simulates waiting for a network response after making a GET request
    let nodes = document.getElementsByClassName('metadata');
    for (let i = 0; i < nodes.length; i++) {
      // appends a style node to each metadata div
      nodes[i].setAttribute("style","animation-delay: ." + [i] + "s;");
      for (let j = 0; j < 3; j++) {
        // appends a style node to each metadata child
        let child = nodes[i].childNodes[j];
        child.setAttribute("style","animation-delay: ." + [i] + "s;");
      }
    }
  }
  colorLetters() {
    // colors the sequence letters in the modal window
    let el = document.getElementById('colored-seq');
    el.innerHTML = '';
    let uncoloredText = this.state.expandedSeq.sequence;
    for (let i = 0; i < uncoloredText.length; i++) {
      // creates a span around each letter and appends that span to the el
      let newSpan = document.createElement("span");
      newSpan.setAttribute("class", uncoloredText[i]);
      let textNode = document.createTextNode(uncoloredText[i]);
      newSpan.appendChild(textNode);
      el.appendChild(newSpan);
    }
  }
  showModal(sequence) {
    document.getElementById("modal").classList.remove('hidden');
    // updates state with the metadata to show in modal window
    for (let i = 0; i < this.props.loadedSequences.length; i++) {
      let currentSeq = this.props.loadedSequences[i];
      if (currentSeq.sequenceName === sequence) {
        this.setState( {expandedSeq: {
          sequenceName: currentSeq.sequenceName,
          sequenceDescription: currentSeq.sequenceDescription,
          sequence: currentSeq.sequence
        }});
      }
    }
  }
  // Event Handlers
  handleChange(e) {
    let q = e.target.value.toUpperCase();
    // unhides all sequences
    let el = document.getElementById('metadata-wrapper');
    for (let i = 0; i < el.childNodes.length; i++)
      el.childNodes[i].classList.remove('hidden');
    // if a querystring was entered, hides every sequence which doesn't match it
    if (q) {
      let all = this.props.loadedSequences;
      let sequenceName;
      for (let i = 0; i < all.length; i++) {
        sequenceName = all[i].sequenceName.toUpperCase();
        if (sequenceName.startsWith(q) === false) {
          if (!(document.getElementById(sequenceName)))
            alert('Sequences have not yet finished loading.');
          document.getElementById(sequenceName).classList.add('hidden');
        }
      }
    }
  }
  handleClick(e) {
		switch (e.target.name) {
      case 'closeModal':
        document.getElementById("modal").classList.add('hidden');
        break;
			case 'sequenceDescription':
				this.props.onReorder(e.target.name);
				break;
			case 'sequenceName':
				this.props.onReorder(e.target.name);
				break;
			case 'sequence':
				this.props.onReorder(e.target.name);
				break;
      default:
        this.showModal(e.target.id)
		}
		// closes the modal window when user clicks on the space outside of it
    if (e.target.id === "modal")
      document.getElementById("modal").classList.add('hidden');
  }
  handleKeydown(e) {
    // closes the modal window when Esc key is pressed
    if ((e.key === 'Clear') || (e.key === 'Enter') || (e.key === 'Escape'))
      document.getElementById("modal").classList.add('hidden');
  }
  // Lifecycle Methods
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown, false);
    this.applyLoadingDelay();
    this.colorLetters();
  }
  componentDidUpdate() {
    this.colorLetters();
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeydown, false);
  }
  render() {
    return(
      <main id="sequences">
        <h1>Sequences</h1>
        <section>
          <h2>Sorting and Filtering</h2>
            <label htmlFor="query">Search:</label>
              <input type="search"
                     onChange={this.handleChange}
                     name="query"
                     autoFocus
                     placeholder="Search..." />
          <div id="sort-wrapper">
            <p>Sort by...</p>
            <button onClick={this.handleClick} name="sequenceName">
              Name
              <img alt={"Sort arrow"} name="sequenceName" src={"/img/sort.svg"} />
            </button>
            <button onClick={this.handleClick} name="sequenceDescription">
              Description
              <img alt={"Sort arrow"} name="sequenceDescription" src={"/img/sort.svg"} />
            </button>
            <button onClick={this.handleClick} name="sequence">
              Sequence
              <img alt={"Sort arrow"} name="sequence" src={"/img/sort.svg"} />
            </button>
          </div>
        </section>
        <section className="hidden" id="modal" onClick={this.handleClick}>
          <h2>Detail View</h2>
          <div>
            <button name="closeModal" onClick={this.handleClick}>
              <img
                alt={"Close window"}
                name="closeModal"
                onClick={this.handleClick}
                src={"/img/close.svg"}
              />
            </button>
            <h3>{this.state.expandedSeq.sequenceName}</h3>
            <p>{this.state.expandedSeq.sequenceDescription}</p>
            <br />
            <p id="colored-seq">{this.state.expandedSeq.sequence}</p>
          </div>
        </section>
        <section id="metadata-wrapper">
          <h2>Sequence List</h2>
          {this.props.loadedSequences.map((instance, index) => {
            return (
              <div className="metadata" id={instance.sequenceName} key={index}>
                <h3 onClick={this.handleClick} id={instance.sequenceName}>
                  {instance.sequenceName}
                </h3>
                <p onClick={this.handleClick} id={instance.sequenceName}>
                  {instance.sequenceDescription}
                </p>
                <p onClick={this.handleClick}>
                  {instance.sequence}
                </p>
              </div >
            )
          })}
        </section>
      </main>
    )
  }
}

export default Sequences;
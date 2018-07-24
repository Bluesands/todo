import '../assets/styles/footer.stylus';

export default {
  data() {
    return {
      author: 'Bfl'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
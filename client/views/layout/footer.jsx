import styles from '../../assets/styles/footer.stylus'

export default {
  data () {
    return {
      author: 'Bfl'
    }
  },
  render () {
    return (
      <div id={styles.footer}>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}

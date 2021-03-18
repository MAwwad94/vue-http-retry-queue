const service = {
  retryQueue: [],
  onItemAddedCallbacks: [],
  hasMore () {
    return this.retryQueue.length > 0
  },
  push (retryItem) {
    this.retryQueue.push(retryItem)
    this.onItemAddedCallbacks.forEach((cb) => {
      cb(retryItem)
    })
  },
  pushRetryFn ({reason, retryFn}) {
    return new Promise((resolve, reject) => {
      const retryItem = {
        reason,
        retry() {
          console.log('retrying this promise')
          return Promise.resolve(retryFn())
            .then((value) => resolve(value),
            (value) => reject(value))
        },
        cancel() {
          return reject()
        }
      }
      this.push(retryItem)
    })
  },
  retryAll () {
    return new Promise((resolve, reject) => {
      while (this.hasMore()) {
        this.retryQueue.shift().retry()
      }
      resolve()
    })
  },
  clearAll () {
    this.retryQueue = []
  },
  cancelAll() {
    while (this.hasMore()) {
      this.retryQueue.shift().cancel()
    }
  }  
}

export default service
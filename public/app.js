new Vue({
    el: '#app',
    data: {
      messages: [],
      newMessage: '',
    },
    created() {
      this.fetchMessages();
      this.setupSSE();
    },
    methods: {
      async fetchMessages() {
        const response = await axios.get('/.netlify/functions/events');
        this.messages = response.data.messages || [];
      },
      sendMessage() {
        axios.post('/.netlify/functions/message', {
          text: this.newMessage,
        }).then(() => {
          this.newMessage = '';
        });
      },
      setupSSE() {
        const eventSource = new EventSource('/.netlify/functions/events');
        eventSource.onmessage = (event) => {
          const message = JSON.parse(event.data);
          this.messages.push(message);
        };
      }
    },
  });
  
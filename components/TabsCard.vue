<template>
  <div class="card" data-aos="fade-up">
    <header class="card-header">
      <div class="header-content">
        <div class="poster-details">
          <span>Welcome to your </span><b>Impact</b>
        </div>
      </div>
    </header>
    <div class="card-content">
      <section>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Your contributions">
            <div class="container content">
              <p class="title is-4">Input</p>
              <div class="columns has-text-centered is-multiline is-mobile">
                <div class="column is-3-desktop is-6-mobile">
                  <div class="card kpi-container">
                    <div class="card-content">
                      <p class="has-text-grey">🤲Total investment</p>
                      <p class="is-size-2">
                        24.5k
                      </p>
                      <p class="has-text-grey is-size-7">comgos</p>
                    </div>
                  </div>
                </div>
                <div class="column is-3-desktop is-6-mobile">
                  <div class="card kpi-container">
                    <div class="card-content">
                      <p class="has-text-grey">⏳Volunteering hours</p>
                      <p class="is-size-2">104</p>
                      <p class="has-text-grey is-size-7">hours</p>
                    </div>
                  </div>
                </div>
                <div class="column is-3-desktop is-6-mobile">
                  <div class="card kpi-container">
                    <div class="card-content">
                      <p class="has-text-grey">😇Pro-bono hours</p>
                      <p class="is-size-2">
                        56
                      </p>
                      <p class="has-text-grey is-size-7">hours</p>
                    </div>
                  </div>
                </div>
                <div class="column is-3-desktop is-6-mobile">
                  <div class="card kpi-container">
                    <div class="card-content">
                      <p class="has-text-grey">💰In kind donations</p>
                      <p class="is-size-2">
                        1.230€
                      </p>
                      <p class="has-text-grey is-size-7"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="container content">
              <p class="title is-4">Contributions to SDGs</p>
              <chart
                :type="'horizontalBar'"
                :data="sdgChart"
                :options="sdgChart.options"
              ></chart>
            </div>
          </b-tab-item>

          <b-tab-item label="Your impact">
            <div class="container content">
              <p class="title is-4">Output</p>
              <div class="columns has-text-centered is-multiline is-mobile">
                <div class="column is-4-desktop">
                  <div class="card kpi-container">
                    <div class="card-content">
                      <p class="has-text-grey">🤲Initiatives supported</p>
                      <p class="is-size-2">
                        12
                      </p>
                      <p class="has-text-grey is-size-7">initiatives</p>
                    </div>
                  </div>
                </div>
                <div class="column is-4-desktop">
                  <div class="card kpi-container">
                    <div class="card-content">
                      <p class="has-text-grey">👨‍👩‍👦‍👦People reached</p>
                      <p class="is-size-2">12.5k</p>
                      <p class="has-text-grey is-size-7">people</p>
                    </div>
                  </div>
                </div>
                <div class="column is-4-desktop">
                  <div class="card kpi-container">
                    <div class="card-content">
                      <p class="has-text-grey">📊Social Return on Investment</p>
                      <p class="is-size-2">
                        0.456
                      </p>
                      <p class="has-text-grey is-size-7"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="container content">
              <p class="title is-4">Impact demographics</p>
              <div class="columns">
                <div class="column is-5-desktop">
                  <chart :type="'doughnut'" :data="demoChart"></chart>
                </div>
                <div class="column is-6-desktop">
                  <figure class="image map-img">
                    <img
                      src="../static/images/map.png"
                      style="border-radius: 0.75rem;"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Reports" disabled> </b-tab-item>
        </b-tabs>
      </section>
    </div>
    <!-- <footer class="card-footer">
      <div class="card-footer-item">
        <div class="content">
          <span>Current balance:</span>
          <span class="has-text-weight-bold">7,856.85</span>
          <span class="has-text-weight-bold has-text-primary"> Cs</span>
          <span class="has-text-grey is-size-7"> (0.01btc)</span>
        </div>
      </div>
      <div class="card-footer-item">
        <b-button type="is-success" @click="openTransferModal()">
          Request transfer
        </b-button>
        <div style="margin-right: 1rem"></div>
        <b-button type="is-danger" @click="openTransferModal()">
          Make transfer
        </b-button>
      </div>
    </footer> -->
  </div>
</template>

<style scoped>
.kpi-container {
  display: flex;
  justify-content: center;
}
.map-img {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
.right-content {
  display: flex;
  align-items: center;
}
</style>

<script>
export default {
  data() {
    return {
      isTransferModalActive: false,
      activeTab: 0,
      sdgChart: {
        labels: [
          'No Poverty',
          'Affordable and Clean Energy',
          'Peace, Justice and ...',
          'Climate Action'
        ],
        datasets: [
          {
            label: '',
            data: [150, 40, 10, 20],
            backgroundColor: ['#ed6c63', '#fce473', '#42afe3', '#006400']
          }
        ],
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Comgos'
                }
              }
            ]
          }
        }
      },
      demoChart: {
        labels: [
          'Children',
          'Men and women (18-45)',
          'Men and women (>45)',
          'Youth'
        ],
        datasets: [
          {
            label: '',
            data: [150, 40, 10, 20],
            backgroundColor: ['#ed6c63', '#fce473', '#42afe3', '#006400']
          }
        ]
      }
    }
  },
  methods: {
    displayError: function() {
      this.$buefy.toast.open({
        duration: 1500,
        message: `Ooops. This is not yet implemented`,
        position: 'is-top',
        type: 'is-warning'
      })
    },
    openTransferModal: function() {
      this.$emit('openModal', true)
    }
  }
}
</script>

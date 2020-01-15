<template>
  <div class="card" data-aos="fade-up">
    <header class="card-header">
      <div class="header-content">
        <div class="poster-details">
          <span>Welcome to your </span><b>Wallet</b>
        </div>
      </div>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image"
              style="object-fit: cover; border-radius: 5px;"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">@arancha.itwillbe</p>
          <p class="subtitle is-7">
            0x9cB57B5C97eAbd94205C07890BE4c1aD31E486A8
          </p>
        </div>
      </div>
      <p class="title">Transactions</p>
      <b-table
        :data="data"
        paginated
        per-page="5"
        default-sort="date"
        default-sort-direction="desc"
      >
        <template slot-scope="props">
          <b-table-column field="Username" label="Recipient" width="40" numeric>
            <template slot="header" slot-scope="{ column }">
              <b-tooltip label="Recipient handle" dashed>
                {{ column.label }}
              </b-tooltip>
            </template>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="user.first_name" label="First Name">
            <template slot="header" slot-scope="{ column }">
              <b-tooltip :label="column.label" dashed>
                {{ column.label }}
              </b-tooltip>
            </template>
            {{ props.row.first_name }}
          </b-table-column>

          <b-table-column field="user.amount" label="Amount">
            <template slot="header" slot-scope="{ column }">
              <b-tooltip label="Amount in Comgos" dashed>
                {{ column.label }}
              </b-tooltip>
            </template>
            {{ props.row.amount }}
            <span class="has-text-primary has-text-weight-bold">Cs</span>
          </b-table-column>

          <b-table-column field="date" label="Date" sortable centered>
            <span class="tag is-success">
              {{ new Date(props.row.date).toLocaleDateString() }}
            </span>
          </b-table-column>
        </template>
      </b-table>
    </div>
    <footer class="card-footer">
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
    </footer>
  </div>
</template>

<style scoped>
img.aspect-ratio-hack {
  object-fit: cover;
}
img.border-hack {
  border-radius: 10px 10px 0 0;
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
      data: [
        {
          id: '@jesse',
          first_name: 'Jesse',
          amount: 1200,
          date: '2019-10-15 13:43:27',
          gender: 'Male'
        },
        {
          id: '@john',
          first_name: 'John',
          amount: 2310,
          date: '2019-12-15 06:00:53',
          gender: 'Male'
        },
        {
          id: '@ngo1',
          first_name: 'Tina',
          amount: 1210,
          date: '2019-04-26 06:26:28',
          gender: 'Female'
        },
        {
          id: '@gno2',
          first_name: 'Clarence',
          amount: 2450,
          date: '2019-04-10 10:28:46',
          gender: 'Male'
        },
        {
          id: '@foundation',
          first_name: 'Anne',
          amount: 3100,
          date: '2019-12-06 14:38:38',
          gender: 'Female'
        },
        {
          id: '@foundation3',
          first_name: 'Anne',
          amount: 5400,
          date: '2019-12-06 14:38:38',
          gender: 'Female'
        }
      ]
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

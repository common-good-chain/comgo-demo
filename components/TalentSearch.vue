<template>
  <div>
    <vue-simple-suggest
      ref="suggestComponent"
      placeholder="🔍 Search"
      :list="allTalents"
      :styles="autoCompleteStyle"
      :filter-by-query="true"
      :max-suggestions="10"
      :display-attribute="'name'"
      @select="onSuggestSelect"
    >
      <div
        slot="suggestion-item"
        slot-scope="scope"
        class="custom-suggest-item container"
      >
        <div class="media">
          <div class="media-left">
            <img
              class="image is-64x64"
              style="object-fit: cover; border-radius: 5px;"
              src="https://bulma.io/images/placeholders/64x64.png"
            />
          </div>
          <div class="media-content">
            <p class="subtitle is-7">
              {{ scope.suggestion.occupation }}
            </p>
            <p class="title is-5" v-html="boldenSuggestion(scope, 'name')"></p>
            <p class="subtitle is-7 overflow-safety">
              {{ scope.suggestion.categories }}
            </p>
          </div>
        </div>
      </div>
    </vue-simple-suggest>
  </div>
</template>

<style>
.suggest-item {
  padding: 5px 10px;
}
.suggest-item.hover {
  background: #f2f2f2;
  color: #fff;
  border-radius: 10px;
}
.suggestions {
  position: absolute;
  border-radius: 10px;
  width: 600px;
  background-color: #fff;
  opacity: 1;
  z-index: 1000;
  border-radius: 10px;
  border: 0px;
  box-shadow: 0 2px 14px rgba(10, 10, 10, 0.3), 0 0 0 0px rgba(10, 10, 10, 0.1);
}
.input.width-hack {
  width: 350px;
}
</style>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'

export default {
  components: {
    VueSimpleSuggest
  },
  props: ['allTalents'],
  data() {
    return {
      autoCompleteStyle: {
        defaultInput: 'input is-primary width-hack'
      }
    }
  },
  methods: {
    onSuggestSelect: function(data) {
      this.$router.push({ name: 'talents-id', params: { id: data.id } })
    },
    boldenSuggestion(scope, element) {
      if (!scope) return scope
      const { suggestion, query } = scope
      const result = this.$refs.suggestComponent.displayProperty(
        suggestion[element]
      )
      if (!query) return result
      const texts = query.split(/[\s-_/\\|.]/gm).filter(t => !!t) || ['']
      return result.replace(
        new RegExp('(.*?)(' + texts.join('|') + ')(.*?)', 'gi'),
        '$1<b>$2</b>$3'
      )
    }
  }
}
</script>

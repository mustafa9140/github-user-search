<template>
  <h3>Search</h3>
  <div class="container">
    <section class="row">
      <div class="col-12 text-start">
        <p>Search the github users here:</p>
      </div>
      <div class="col-12">
        <form class="row" @submit.prevent="getSearchResults">
          <div class="col-4 mb-3">
            <input type="text" v-model="query" class="form-control" />
            <div v-show="showError" class="error">
              <p>Please add a username to search</p>
            </div>
          </div>
          <div class="col-1 mb-3">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
    <section v-show="showResult" class="pb-5 mb-5">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click="previousResults"
            >
              <span aria-hidden="true">&laquo;</span>&nbsp;
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click="nextResults"
            >
              <span class="sr-only">Next</span>&nbsp;
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <strong class="text-start">
        <p>{{ userCount }} users found</p>
      </strong>
      <p v-show="isLoading" class="text-start">Loading...</p>
      <div class="text-start" v-if="userCount > 0">
        <template v-for="user in users">
          <template v-if="typeof user.node.url != 'undefined'
          ">
            <div class="d-flex mb-2 border-bottom pb-2 align-items-center">
              <div class="thumbnail">
                <img
                  :src="user.node.avatarUrl"
                  class="rounded-circle img-thumbnail d-block"
                />
              </div>
              <a
                class="cursor-pointer text-decoration-none"
                :href="user.node.url"
                target="_blank"
              >
                <span v-if="user.node.name != null">
                  {{ user.node.name }},
                </span>
                <strong>
                  {{ user.node.url }}
                </strong>
              </a>
            </div>
          </template>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import SearchService from "../../services/search.service";
export default {
  data() {
    return {
      showError: false,
      showResult: false,
      isLoading: false,
      query: "",
      users: [],
      userCount: 0,
      pageInfo: {
        endCursor: "",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
      },
    };
  },
  created() {},
  methods: {
    getSearchResults() {
      let self = this;
      self.showError = false;
      if (self.query == "") {
        self.showError = true;
        self.showResult = false;
        return;
      }
      self.fetchUsers();
    },
    previousResults() {
      let self = this;
      if (self.pageInfo.hasPreviousPage) {
        self.fetchUsers("", self.pageInfo.startCursor);
      }
    },
    nextResults() {
      let self = this;
      if (self.pageInfo.hasNextPage) {
        self.fetchUsers(self.pageInfo.endCursor);
      }
    },
    fetchUsers(endCursor = "", startCursor = "") {
      let self = this;
      self.isLoading = true;
      SearchService.searchUser(self.query, endCursor, startCursor).then(
        (res) => {
          if (typeof res.data.data != "undefined") {
            console.log(res.data.data);
            if (res.data.data.search.edges.length > 0) {
              self.users = [...res.data.data.search.edges];
              self.pageInfo = { ...res.data.data.search.pageInfo };
            }
            self.showResult = true;
            self.isLoading = false;
            self.userCount = res.data.data.search.userCount;
          }
        }
      );
    },
  },
};
</script>

<style>
.error {
  color: red;
  font-size: 12px;
  text-align: start;
  margin-top: 3px;
}
.thumbnail {
  width: 50px;
  margin-right: 15px;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-pointer:hover {
  color: #1900fd;
}
</style>

<template>
  <div class="fe-team__table">
    <!-- <button @click="fetchTeam"> CLICK</button>
    <p>authState: {{authState}}</p> -->

    
    <div class="fe-table__container">
      <div class="fe-table" role="table">
        <div class="fe-table__table-container">
          <div class="fe-table__tbody" role="rowgroup">
            <div class="fe-table__tr">
              <div class="fe-table__tr-td fe-table__tr-td-empty">No Results Found</div>
            </div>
          </div>
          <div class="fe-table__thead">
            <div class="fe-table__thead-tr" role="row" style="display: flex; flex: 1 0 auto;">
              <div
                class="fe-table__thead-tr-th fe-table__thead-tr-th__first-cell"
                colspan="1"
                role="columnheader"
                style="box-sizing: border-box;"
              >
                <div style="min-width: 2.25rem; max-width: 2.25rem;"></div>
                <div class="fe-table__spacer"></div>
              </div>
              <div
                class="fe-table__thead-tr-th"
                colspan="1"
                role="columnheader"
                title="Toggle SortBy"
                style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
              >
                Name<svg
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fe-icon"
                >
                  <path fill="currentColor" d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"></path>
                  <path fill="currentColor" d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"></path>
                </svg>
                <div class="fe-table__spacer"></div>
              </div>
              <div
                class="fe-table__thead-tr-th"
                colspan="1"
                role="columnheader"
                title="Toggle SortBy"
                style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
              >
                Email<svg
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fe-icon"
                >
                  <path fill="currentColor" d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"></path>
                  <path fill="currentColor" d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"></path>
                </svg>
                <div class="fe-table__spacer"></div>
              </div>
              <div
                class="fe-table__thead-tr-th"
                colspan="1"
                role="columnheader"
                title="Toggle SortBy"
                style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
              >
                Joined Team<svg
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fe-icon"
                >
                  <path fill="currentColor" d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"></path>
                  <path fill="currentColor" d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"></path>
                </svg>
                <div class="fe-table__spacer"></div>
              </div>
              <div
                class="fe-table__thead-tr-th"
                colspan="1"
                role="columnheader"
                title="Toggle SortBy"
                style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
              >
                Last Login<svg
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fe-icon"
                >
                  <path fill="currentColor" d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"></path>
                  <path fill="currentColor" d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"></path>
                </svg>
                <div class="fe-table__spacer"></div>
              </div>
              <div class="fe-table__thead-tr-th" colspan="1" role="columnheader" style="box-sizing: border-box;">
                <div style="min-width: 3.25rem; max-width: 3.25rem;"></div>
                <div class="fe-table__spacer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from '@/plugins/fronteggCore/map-state'
import { AuthState } from '@/plugins/fronteggAuth/Api';
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";

export default Vue.extend({
  name: "Team-table",
  data() {
    return {
      ...mapState(this, {
        authState: (state: { auth: AuthState }) => state.auth,
      }),
      currentStep: '',
    }
  },
  methods: {
    fetchTeam() {
      this[FRONTEGG_STORE_KEY].dispatch({
          type: "auth/loadUsers",
          payload: {
            silentLoading: false,
          },
        });
    }
  },
});
</script>

<style lang="scss" scoped>

</style>

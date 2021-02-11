<template>
  <div class="fe-team__table">
    <div class="fe-table__container">
      <button @click="fetchTeam">
        CLICK
      </button>
      <!-- {{items}} -->
      <!-- <p>teamState: {{membersList}}</p> -->

      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="totalDesserts"
        :loading="loading"
      />

      <!-- <v-data-table
        :height="300"
        :headers="headers"
        :items="items"
        :items-per-page="5"
        :custom-sort="customSort"
        fixed-header
      ></v-data-table> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from '@/plugins/fronteggCore/map-state'
import { FRONTEGG_STORE_KEY } from "@/plugins/fronteggCore/constants";
import { AuthState } from "@/plugins/fronteggAuth/Api";

export default Vue.extend({
  name: "TeamTable",
  data() {
    return {
      ...mapState(this, {
        membersList: (state: { auth: AuthState }) => state.auth.teamState,
      }),
      totalDesserts: 0,
      loading: false,
      options: {},

      headers: [
          {
            text: 'Name',
            sortable: true,
            align: 'center',
            value: 'name',
          },
          {
            text: 'Email',
            sortable: true,
            align: 'center',
            value: 'email',
          },
          {
            text: 'Roles',
            sortable: false,
            align: 'center',
            value: 'roleIds',
          },
          {
            text: 'Joined Team',
            sortable: true,
            align: 'center',
            value: 'createdAt',
          },
          {
            text: 'Last Login',
            sortable: true,
            align: 'center',
            value: 'lastLogin',
          },
        ],
      items: [
        {
          "id": "bbcd5682-eb5e-4e6b-860d-1efd584e5b3b",
          "email": "eldad+21@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [],
          "name": "Eldad Giladi",
          "phone": null,
          "mfaEnabled": true,
          "customData": null,
          "lastLogin": "2021-02-07T13:22:55.000Z",
          "createdAt": "2021-02-07T13:12:23.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/e0f3beea3b06d8f2cbdd08eea3b4273d?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "profileImage": "https://www.gravatar.com/avatar/e0f3beea3b06d8f2cbdd08eea3b4273d?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "activatedForTenant": true
        },
        {
          "id": "df01a4aa-9c0d-449e-a83f-789383f61688",
          "email": "david+223@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "Add New User",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-02-07T11:47:39.000Z",
          "createdAt": "2021-02-07T11:47:11.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/f59defadf6e95c1c2d26b5f8a81467ff?d=https://ui-avatars.com/api/Add+New%20User/128/random",
          "profileImage": "https://www.gravatar.com/avatar/f59defadf6e95c1c2d26b5f8a81467ff?d=https://ui-avatars.com/api/Add+New%20User/128/random",
          "activatedForTenant": true
        },
        {
          "id": "c07996b2-658e-454b-b915-ba7df62b8851",
          "email": "david+11@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "96b36e2f-4308-49f3-bcd6-d83aabf0632f",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "David Antoon",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-02-07T11:46:53.000Z",
          "createdAt": "2021-02-07T11:38:38.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/75d74f67ed00e9adc6819dbb80883f51?d=https://ui-avatars.com/api/David+Antoon/128/random",
          "profileImage": "https://www.gravatar.com/avatar/75d74f67ed00e9adc6819dbb80883f51?d=https://ui-avatars.com/api/David+Antoon/128/random",
          "activatedForTenant": true
        },
        {
          "id": "bfaf642c-dfa4-451b-886b-a60022ebb943",
          "email": "ymahmood@itgsoftware.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [],
          "name": "Yousef Mahmoud",
          "phone": null,
          "mfaEnabled": true,
          "customData": null,
          "lastLogin": null,
          "profileImageUrl": "https://lh5.googleusercontent.com/-iHNRYx-Yhd4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckTEmDErr3LIv1mhpv1E4fIitO3ug/s96-c/photo.jpg",
          "profileImage": "https://lh5.googleusercontent.com/-iHNRYx-Yhd4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckTEmDErr3LIv1mhpv1E4fIitO3ug/s96-c/photo.jpg",
          "activatedForTenant": true
        },
        {
          "id": "4dbf3cbb-43a2-4f8d-bf3c-d313c0f0913d",
          "email": "eldad+test25@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3"
          ],
          "name": "Eldad Giladi",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2021-01-26T11:24:34.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/d0a23278218394ba47ab4a7942e88280?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "profileImage": "https://www.gravatar.com/avatar/d0a23278218394ba47ab4a7942e88280?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "activatedForTenant": true
        },
        {
          "id": "2745246a-0665-4d80-a438-757b85e6b765",
          "email": "aviad+133@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "3e0a1b94-2dc0-496f-b481-530a088e410c",
            "0d139afd-688b-499d-9d83-030536fd3324"
          ],
          "name": "Aviad new",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-01-17T21:07:00.000Z",
          "createdAt": "2021-01-17T21:04:38.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/f0656dc3d7176e77d13a45178e981e4f?d=https://ui-avatars.com/api/Aviad+new/128/random",
          "profileImage": "https://www.gravatar.com/avatar/f0656dc3d7176e77d13a45178e981e4f?d=https://ui-avatars.com/api/Aviad+new/128/random",
          "activatedForTenant": true
        },
        {
          "id": "db5b7d68-d46a-4b14-8b31-a4cab63fe7f9",
          "email": "ofri+123@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e"
          ],
          "name": "ofri",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-12-22T12:52:05.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/586a70b5113c5cc3d34750a4ddf6d7b0?d=https://ui-avatars.com/api/ofri/128/random",
          "profileImage": "https://www.gravatar.com/avatar/586a70b5113c5cc3d34750a4ddf6d7b0?d=https://ui-avatars.com/api/ofri/128/random",
          "activatedForTenant": true
        },
        {
          "id": "09e576fd-2ecb-4497-adc4-6d2051b5b6ed",
          "email": "livnek@gmail.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45"
          ],
          "name": "Livne Kestin",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-12-31T06:28:02.000Z",
          "createdAt": "2020-12-22T09:41:50.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/6c080edafc7710834eaf099fc7a3e36b?d=https://ui-avatars.com/api/Livne+Kestin/128/random",
          "profileImage": "https://www.gravatar.com/avatar/6c080edafc7710834eaf099fc7a3e36b?d=https://ui-avatars.com/api/Livne+Kestin/128/random",
          "activatedForTenant": true
        },
        {
          "id": "70ec9ecf-9fd1-4b8f-a235-7b2684c8616e",
          "email": "ofri+25@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "ofri+25",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-12-14T08:38:28.000Z",
          "createdAt": "2020-12-14T08:37:28.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/3eab78abe75f7bcd43b03d35d18caa95?d=https://ui-avatars.com/api/ofri+25/128/random",
          "profileImage": "https://www.gravatar.com/avatar/3eab78abe75f7bcd43b03d35d18caa95?d=https://ui-avatars.com/api/ofri+25/128/random",
          "activatedForTenant": true
        },
        {
          "id": "2b1879c5-9daf-44a5-8a4e-fa639ee80f5f",
          "email": "ofri+100@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e"
          ],
          "name": "ofri",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-12-10T09:53:28.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/399e745c38f384e2716281cf56fda126?d=https://ui-avatars.com/api/ofri/128/random",
          "profileImage": "https://www.gravatar.com/avatar/399e745c38f384e2716281cf56fda126?d=https://ui-avatars.com/api/ofri/128/random",
          "activatedForTenant": true
        },
        {
          "id": "5e65e26d-1506-4428-93ef-a695d8616e48",
          "email": "yoni@getbalance.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["10220593-57ac-4ba1-b252-029340cf6e45"],
          "name": "Yoni",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-11-30T10:36:58.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/79aaa57a2f5eb2374678599f1054a4e8?d=https://ui-avatars.com/api/Yoni/128/random",
          "profileImage": "https://www.gravatar.com/avatar/79aaa57a2f5eb2374678599f1054a4e8?d=https://ui-avatars.com/api/Yoni/128/random",
          "activatedForTenant": true
        },
        {
          "id": "5169bf4f-6bb9-494c-8cde-90784445f807",
          "email": "ofri+1@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c",
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "0d139afd-688b-499d-9d83-030536fd3324",
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e"
          ],
          "name": "ofri+1",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-02-07T11:38:19.000Z",
          "createdAt": "2020-11-19T09:20:29.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/42b2ad2bad6fc9b9db5086dfcf8072ac?d=https://ui-avatars.com/api/ofri+1/128/random",
          "profileImage": "https://www.gravatar.com/avatar/42b2ad2bad6fc9b9db5086dfcf8072ac?d=https://ui-avatars.com/api/ofri+1/128/random",
          "activatedForTenant": true
        },
        {
          "id": "7ded6213-0609-4851-b224-fcdd8ca7c7af",
          "email": "davidn@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["10220593-57ac-4ba1-b252-029340cf6e45"],
          "name": "David Novick",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-15T13:06:04.000Z",
          "createdAt": "2020-11-15T13:00:53.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/567c243d0d2a54f113b20564d92339e8?d=https://ui-avatars.com/api/David+Novick/128/random",
          "profileImage": "https://www.gravatar.com/avatar/567c243d0d2a54f113b20564d92339e8?d=https://ui-avatars.com/api/David+Novick/128/random",
          "activatedForTenant": true
        },
        {
          "id": "81ff002e-ca63-4f9d-a7c9-c99bec8b8153",
          "email": "aviad+181@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f"
          ],
          "name": "Aviad Mizrachi",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-11-11T08:09:40.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/c9b30c346adb2de4bbd4cfaca090ab15?d=https://ui-avatars.com/api/Aviad+Mizrachi/128/random",
          "profileImage": "https://www.gravatar.com/avatar/c9b30c346adb2de4bbd4cfaca090ab15?d=https://ui-avatars.com/api/Aviad+Mizrachi/128/random",
          "activatedForTenant": true
        },
        {
          "id": "a5f2c115-ab34-4206-9439-1acc77ce64fd",
          "email": "aviad+161@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f"
          ],
          "name": "aviad+161@frontegg.com",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-10T12:48:12.000Z",
          "createdAt": "2020-11-10T12:46:34.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/05b59450816123078962cfa197245331?d=https://ui-avatars.com/api/aviad+161@frontegg.com/128/random",
          "profileImage": "https://www.gravatar.com/avatar/05b59450816123078962cfa197245331?d=https://ui-avatars.com/api/aviad+161@frontegg.com/128/random",
          "activatedForTenant": true
        },
        {
          "id": "9d883a7e-19df-48de-8ba3-38f6866a02bb",
          "email": "dor@cycode.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f"
          ],
          "name": null,
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-10T09:25:21.000Z",
          "createdAt": "2020-11-10T09:25:20.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/95d1e83785a02b4058a8401bbce28cc3?d=https://ui-avatars.com/api/undefined/128/random",
          "profileImage": "https://www.gravatar.com/avatar/95d1e83785a02b4058a8401bbce28cc3?d=https://ui-avatars.com/api/undefined/128/random",
          "activatedForTenant": true
        },
        {
          "id": "6352f122-7778-4366-b1e6-c5c475923d13",
          "email": "ofri+12@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["0d139afd-688b-499d-9d83-030536fd3324"],
          "name": "ofri+12@frontegg.com",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-01-28T14:29:00.000Z",
          "createdAt": "2021-01-28T14:27:37.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/2d8d3056f37dac7f9624524bb462dba3?d=https://ui-avatars.com/api/ofri+12@frontegg.com/128/random",
          "profileImage": "https://www.gravatar.com/avatar/2d8d3056f37dac7f9624524bb462dba3?d=https://ui-avatars.com/api/ofri+12@frontegg.com/128/random",
          "activatedForTenant": true
        },
        {
          "id": "863c79ba-a809-4875-9105-db603f3ad399",
          "email": "aviad+106@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "10220593-57ac-4ba1-b252-029340cf6e45"
          ],
          "name": "Aviad asdasdasd",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-11-05T13:48:23.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/9434a076ef49f499423cf3d82c8ff283?d=https://ui-avatars.com/api/Aviad+asdasdasd/128/random",
          "profileImage": "https://www.gravatar.com/avatar/9434a076ef49f499423cf3d82c8ff283?d=https://ui-avatars.com/api/Aviad+asdasdasd/128/random",
          "activatedForTenant": true
        },
        {
          "id": "cd7661e0-2023-4c25-a9f4-98c55bcb5f32",
          "email": "asaf@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["10220593-57ac-4ba1-b252-029340cf6e45"],
          "name": null,
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-05T11:26:33.000Z",
          "createdAt": "2020-11-05T11:23:33.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/b8b2b38569a86c5efa21d8957bb42bcd?d=https://ui-avatars.com/api/undefined/128/random",
          "profileImage": "https://www.gravatar.com/avatar/b8b2b38569a86c5efa21d8957bb42bcd?d=https://ui-avatars.com/api/undefined/128/random",
          "activatedForTenant": true
        },
        {
          "id": "4271b6ad-362e-4c3f-a0d7-147d7e3a5579",
          "email": "aviad@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "0d139afd-688b-499d-9d83-030536fd3324",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "Aviad Mizrachi",
          "phone": null,
          "mfaEnabled": true,
          "customData": "{}",
          "lastLogin": "2021-01-04T09:40:27.000Z",
          "createdAt": "2020-11-04T11:45:37.000Z",
          "profileImageUrl": "https://lh3.googleusercontent.com/a-/AOh14GjdC4KuFC2pbT4eZlkLbDZWgzX8xp8HI0aK4Sy2=s96-c",
          "profileImage": "https://lh3.googleusercontent.com/a-/AOh14GjdC4KuFC2pbT4eZlkLbDZWgzX8xp8HI0aK4Sy2=s96-c",
          "activatedForTenant": true
        }
      ]
    }
  },
  methods: {
    customSort (items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: string) {
      console.log('items:', items);
      console.log('sortBy:', sortBy);
      console.log('sortDesc:', sortDesc);
      console.log('locale:', locale);
      console.log('customSorters:', customSorters);
      return this.items;
    },
    async fetchTeam() {
      this.loading = true;
      try {
        const items = await this.fakeItmems();
        console.log(items)
        this.items = items;
      } finally {
        this.loading = false;
      }
      // this[FRONTEGG_STORE_KEY].dispatch({
      //     type: "auth/loadUsers",
      //     payload: {
      //       silentLoading: false,
      //       pageSize: 1,
      //     },
      //   });
    },


    fakeItmems() {
      return [
        {
          "id": "bbcd5682-eb5e-4e6b-860d-1efd584e5b3b",
          "email": "eldad+21@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [],
          "name": "Eldad Giladi",
          "phone": null,
          "mfaEnabled": true,
          "customData": null,
          "lastLogin": "2021-02-07T13:22:55.000Z",
          "createdAt": "2021-02-07T13:12:23.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/e0f3beea3b06d8f2cbdd08eea3b4273d?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "profileImage": "https://www.gravatar.com/avatar/e0f3beea3b06d8f2cbdd08eea3b4273d?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "activatedForTenant": true
        },
        {
          "id": "df01a4aa-9c0d-449e-a83f-789383f61688",
          "email": "david+223@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "Add New User",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-02-07T11:47:39.000Z",
          "createdAt": "2021-02-07T11:47:11.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/f59defadf6e95c1c2d26b5f8a81467ff?d=https://ui-avatars.com/api/Add+New%20User/128/random",
          "profileImage": "https://www.gravatar.com/avatar/f59defadf6e95c1c2d26b5f8a81467ff?d=https://ui-avatars.com/api/Add+New%20User/128/random",
          "activatedForTenant": true
        },
        {
          "id": "c07996b2-658e-454b-b915-ba7df62b8851",
          "email": "david+11@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "96b36e2f-4308-49f3-bcd6-d83aabf0632f",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "David Antoon",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-02-07T11:46:53.000Z",
          "createdAt": "2021-02-07T11:38:38.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/75d74f67ed00e9adc6819dbb80883f51?d=https://ui-avatars.com/api/David+Antoon/128/random",
          "profileImage": "https://www.gravatar.com/avatar/75d74f67ed00e9adc6819dbb80883f51?d=https://ui-avatars.com/api/David+Antoon/128/random",
          "activatedForTenant": true
        },
        {
          "id": "bfaf642c-dfa4-451b-886b-a60022ebb943",
          "email": "ymahmood@itgsoftware.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [],
          "name": "Yousef Mahmoud",
          "phone": null,
          "mfaEnabled": true,
          "customData": null,
          "lastLogin": null,
          "profileImageUrl": "https://lh5.googleusercontent.com/-iHNRYx-Yhd4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckTEmDErr3LIv1mhpv1E4fIitO3ug/s96-c/photo.jpg",
          "profileImage": "https://lh5.googleusercontent.com/-iHNRYx-Yhd4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckTEmDErr3LIv1mhpv1E4fIitO3ug/s96-c/photo.jpg",
          "activatedForTenant": true
        },
        {
          "id": "4dbf3cbb-43a2-4f8d-bf3c-d313c0f0913d",
          "email": "eldad+test25@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3"
          ],
          "name": "Eldad Giladi",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2021-01-26T11:24:34.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/d0a23278218394ba47ab4a7942e88280?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "profileImage": "https://www.gravatar.com/avatar/d0a23278218394ba47ab4a7942e88280?d=https://ui-avatars.com/api/Eldad+Giladi/128/random",
          "activatedForTenant": true
        },
        {
          "id": "2745246a-0665-4d80-a438-757b85e6b765",
          "email": "aviad+133@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "3e0a1b94-2dc0-496f-b481-530a088e410c",
            "0d139afd-688b-499d-9d83-030536fd3324"
          ],
          "name": "Aviad new",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-01-17T21:07:00.000Z",
          "createdAt": "2021-01-17T21:04:38.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/f0656dc3d7176e77d13a45178e981e4f?d=https://ui-avatars.com/api/Aviad+new/128/random",
          "profileImage": "https://www.gravatar.com/avatar/f0656dc3d7176e77d13a45178e981e4f?d=https://ui-avatars.com/api/Aviad+new/128/random",
          "activatedForTenant": true
        },
        {
          "id": "db5b7d68-d46a-4b14-8b31-a4cab63fe7f9",
          "email": "ofri+123@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e"
          ],
          "name": "ofri",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-12-22T12:52:05.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/586a70b5113c5cc3d34750a4ddf6d7b0?d=https://ui-avatars.com/api/ofri/128/random",
          "profileImage": "https://www.gravatar.com/avatar/586a70b5113c5cc3d34750a4ddf6d7b0?d=https://ui-avatars.com/api/ofri/128/random",
          "activatedForTenant": true
        },
        {
          "id": "09e576fd-2ecb-4497-adc4-6d2051b5b6ed",
          "email": "livnek@gmail.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "0d139afd-688b-499d-9d83-030536fd3324",
            "10220593-57ac-4ba1-b252-029340cf6e45"
          ],
          "name": "Livne Kestin",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-12-31T06:28:02.000Z",
          "createdAt": "2020-12-22T09:41:50.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/6c080edafc7710834eaf099fc7a3e36b?d=https://ui-avatars.com/api/Livne+Kestin/128/random",
          "profileImage": "https://www.gravatar.com/avatar/6c080edafc7710834eaf099fc7a3e36b?d=https://ui-avatars.com/api/Livne+Kestin/128/random",
          "activatedForTenant": true
        },
        {
          "id": "70ec9ecf-9fd1-4b8f-a235-7b2684c8616e",
          "email": "ofri+25@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "ofri+25",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-12-14T08:38:28.000Z",
          "createdAt": "2020-12-14T08:37:28.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/3eab78abe75f7bcd43b03d35d18caa95?d=https://ui-avatars.com/api/ofri+25/128/random",
          "profileImage": "https://www.gravatar.com/avatar/3eab78abe75f7bcd43b03d35d18caa95?d=https://ui-avatars.com/api/ofri+25/128/random",
          "activatedForTenant": true
        },
        {
          "id": "2b1879c5-9daf-44a5-8a4e-fa639ee80f5f",
          "email": "ofri+100@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e"
          ],
          "name": "ofri",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-12-10T09:53:28.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/399e745c38f384e2716281cf56fda126?d=https://ui-avatars.com/api/ofri/128/random",
          "profileImage": "https://www.gravatar.com/avatar/399e745c38f384e2716281cf56fda126?d=https://ui-avatars.com/api/ofri/128/random",
          "activatedForTenant": true
        },
        {
          "id": "5e65e26d-1506-4428-93ef-a695d8616e48",
          "email": "yoni@getbalance.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["10220593-57ac-4ba1-b252-029340cf6e45"],
          "name": "Yoni",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-11-30T10:36:58.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/79aaa57a2f5eb2374678599f1054a4e8?d=https://ui-avatars.com/api/Yoni/128/random",
          "profileImage": "https://www.gravatar.com/avatar/79aaa57a2f5eb2374678599f1054a4e8?d=https://ui-avatars.com/api/Yoni/128/random",
          "activatedForTenant": true
        },
        {
          "id": "5169bf4f-6bb9-494c-8cde-90784445f807",
          "email": "ofri+1@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "3e0a1b94-2dc0-496f-b481-530a088e410c",
            "4ccb3bb4-9a78-40ab-8023-ad70da9837a3",
            "56ce1c61-18aa-472b-bb60-69e6b02b16f3",
            "0d139afd-688b-499d-9d83-030536fd3324",
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "60afbd0a-e265-4a35-8c2f-8f500b4c959e"
          ],
          "name": "ofri+1",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-02-07T11:38:19.000Z",
          "createdAt": "2020-11-19T09:20:29.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/42b2ad2bad6fc9b9db5086dfcf8072ac?d=https://ui-avatars.com/api/ofri+1/128/random",
          "profileImage": "https://www.gravatar.com/avatar/42b2ad2bad6fc9b9db5086dfcf8072ac?d=https://ui-avatars.com/api/ofri+1/128/random",
          "activatedForTenant": true
        },
        {
          "id": "7ded6213-0609-4851-b224-fcdd8ca7c7af",
          "email": "davidn@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["10220593-57ac-4ba1-b252-029340cf6e45"],
          "name": "David Novick",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-15T13:06:04.000Z",
          "createdAt": "2020-11-15T13:00:53.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/567c243d0d2a54f113b20564d92339e8?d=https://ui-avatars.com/api/David+Novick/128/random",
          "profileImage": "https://www.gravatar.com/avatar/567c243d0d2a54f113b20564d92339e8?d=https://ui-avatars.com/api/David+Novick/128/random",
          "activatedForTenant": true
        },
        {
          "id": "81ff002e-ca63-4f9d-a7c9-c99bec8b8153",
          "email": "aviad+181@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f"
          ],
          "name": "Aviad Mizrachi",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-11-11T08:09:40.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/c9b30c346adb2de4bbd4cfaca090ab15?d=https://ui-avatars.com/api/Aviad+Mizrachi/128/random",
          "profileImage": "https://www.gravatar.com/avatar/c9b30c346adb2de4bbd4cfaca090ab15?d=https://ui-avatars.com/api/Aviad+Mizrachi/128/random",
          "activatedForTenant": true
        },
        {
          "id": "a5f2c115-ab34-4206-9439-1acc77ce64fd",
          "email": "aviad+161@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f"
          ],
          "name": "aviad+161@frontegg.com",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-10T12:48:12.000Z",
          "createdAt": "2020-11-10T12:46:34.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/05b59450816123078962cfa197245331?d=https://ui-avatars.com/api/aviad+161@frontegg.com/128/random",
          "profileImage": "https://www.gravatar.com/avatar/05b59450816123078962cfa197245331?d=https://ui-avatars.com/api/aviad+161@frontegg.com/128/random",
          "activatedForTenant": true
        },
        {
          "id": "9d883a7e-19df-48de-8ba3-38f6866a02bb",
          "email": "dor@cycode.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f"
          ],
          "name": null,
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-10T09:25:21.000Z",
          "createdAt": "2020-11-10T09:25:20.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/95d1e83785a02b4058a8401bbce28cc3?d=https://ui-avatars.com/api/undefined/128/random",
          "profileImage": "https://www.gravatar.com/avatar/95d1e83785a02b4058a8401bbce28cc3?d=https://ui-avatars.com/api/undefined/128/random",
          "activatedForTenant": true
        },
        {
          "id": "6352f122-7778-4366-b1e6-c5c475923d13",
          "email": "ofri+12@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["0d139afd-688b-499d-9d83-030536fd3324"],
          "name": "ofri+12@frontegg.com",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2021-01-28T14:29:00.000Z",
          "createdAt": "2021-01-28T14:27:37.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/2d8d3056f37dac7f9624524bb462dba3?d=https://ui-avatars.com/api/ofri+12@frontegg.com/128/random",
          "profileImage": "https://www.gravatar.com/avatar/2d8d3056f37dac7f9624524bb462dba3?d=https://ui-avatars.com/api/ofri+12@frontegg.com/128/random",
          "activatedForTenant": true
        },
        {
          "id": "863c79ba-a809-4875-9105-db603f3ad399",
          "email": "aviad+106@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "10220593-57ac-4ba1-b252-029340cf6e45"
          ],
          "name": "Aviad asdasdasd",
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": null,
          "createdAt": "2020-11-05T13:48:23.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/9434a076ef49f499423cf3d82c8ff283?d=https://ui-avatars.com/api/Aviad+asdasdasd/128/random",
          "profileImage": "https://www.gravatar.com/avatar/9434a076ef49f499423cf3d82c8ff283?d=https://ui-avatars.com/api/Aviad+asdasdasd/128/random",
          "activatedForTenant": true
        },
        {
          "id": "cd7661e0-2023-4c25-a9f4-98c55bcb5f32",
          "email": "asaf@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": ["10220593-57ac-4ba1-b252-029340cf6e45"],
          "name": null,
          "phone": null,
          "mfaEnabled": false,
          "customData": null,
          "lastLogin": "2020-11-05T11:26:33.000Z",
          "createdAt": "2020-11-05T11:23:33.000Z",
          "profileImageUrl": "https://www.gravatar.com/avatar/b8b2b38569a86c5efa21d8957bb42bcd?d=https://ui-avatars.com/api/undefined/128/random",
          "profileImage": "https://www.gravatar.com/avatar/b8b2b38569a86c5efa21d8957bb42bcd?d=https://ui-avatars.com/api/undefined/128/random",
          "activatedForTenant": true
        },
        {
          "id": "4271b6ad-362e-4c3f-a0d7-147d7e3a5579",
          "email": "aviad@frontegg.com",
          "vendorId": "93447df4-edcc-45e5-8664-9fb8c196cf44",
          "tenantId": "my-tenant-id",
          "roleIds": [
            "10220593-57ac-4ba1-b252-029340cf6e45",
            "f3769750-23c2-4a51-b86b-b2e32e90472f",
            "0d139afd-688b-499d-9d83-030536fd3324",
            "3e0a1b94-2dc0-496f-b481-530a088e410c"
          ],
          "name": "Aviad Mizrachi",
          "phone": null,
          "mfaEnabled": true,
          "customData": "{}",
          "lastLogin": "2021-01-04T09:40:27.000Z",
          "createdAt": "2020-11-04T11:45:37.000Z",
          "profileImageUrl": "https://lh3.googleusercontent.com/a-/AOh14GjdC4KuFC2pbT4eZlkLbDZWgzX8xp8HI0aK4Sy2=s96-c",
          "profileImage": "https://lh3.googleusercontent.com/a-/AOh14GjdC4KuFC2pbT4eZlkLbDZWgzX8xp8HI0aK4Sy2=s96-c",
          "activatedForTenant": true
        }
      ]
    }
  },
});
</script>

<style lang="scss" >


// <!-- <button @click="fetchTeam"> CLICK</button>
//     <p>teamState: {{teamState}}</p>


//     <div class="fe-table__container">
//       <div
//         class="fe-table"
//         role="table"
//       >
//         <div class="fe-table__table-container">
//           <div
//             class="fe-table__tbody"
//             role="rowgroup"
//           >
//             <div class="fe-table__tr">
//               <div class="fe-table__tr-td fe-table__tr-td-empty">
//                 No Results Found
//               </div>
//             </div>
//           </div>
//           <div class="fe-table__thead">
//             <div
//               class="fe-table__thead-tr"
//               role="row"
//               style="display: flex; flex: 1 0 auto;"
//             >
//               <div
//                 class="fe-table__thead-tr-th fe-table__thead-tr-th__first-cell"
//                 colspan="1"
//                 role="columnheader"
//                 style="box-sizing: border-box;"
//               >
//                 <div style="min-width: 2.25rem; max-width: 2.25rem;" />
//                 <div class="fe-table__spacer" />
//               </div>
//               <div
//                 class="fe-table__thead-tr-th"
//                 colspan="1"
//                 role="columnheader"
//                 title="Toggle SortBy"
//                 style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
//               >
//                 Name<svg
//                   width="2rem"
//                   height="2rem"
//                   viewBox="0 0 12 12"
//                   xmlns="http://www.w3.org/2000/svg"
//                   class="fe-icon"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"
//                   />
//                 </svg>
//                 <div class="fe-table__spacer" />
//               </div>
//               <div
//                 class="fe-table__thead-tr-th"
//                 colspan="1"
//                 role="columnheader"
//                 title="Toggle SortBy"
//                 style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
//               >
//                 Email<svg
//                   width="2rem"
//                   height="2rem"
//                   viewBox="0 0 12 12"
//                   xmlns="http://www.w3.org/2000/svg"
//                   class="fe-icon"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"
//                   />
//                 </svg>
//                 <div class="fe-table__spacer" />
//               </div>
//               <div
//                 class="fe-table__thead-tr-th"
//                 colspan="1"
//                 role="columnheader"
//                 title="Toggle SortBy"
//                 style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
//               >
//                 Joined Team<svg
//                   width="2rem"
//                   height="2rem"
//                   viewBox="0 0 12 12"
//                   xmlns="http://www.w3.org/2000/svg"
//                   class="fe-icon"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"
//                   />
//                 </svg>
//                 <div class="fe-table__spacer" />
//               </div>
//               <div
//                 class="fe-table__thead-tr-th"
//                 colspan="1"
//                 role="columnheader"
//                 title="Toggle SortBy"
//                 style="box-sizing: border-box; flex: 150 0 auto; min-width: 0px; width: 150px; cursor: pointer;"
//               >
//                 Last Login<svg
//                   width="2rem"
//                   height="2rem"
//                   viewBox="0 0 12 12"
//                   xmlns="http://www.w3.org/2000/svg"
//                   class="fe-icon"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z"
//                   />
//                 </svg>
//                 <div class="fe-table__spacer" />
//               </div>
//               <div
//                 class="fe-table__thead-tr-th"
//                 colspan="1"
//                 role="columnheader"
//                 style="box-sizing: border-box;"
//               >
//                 <div style="min-width: 3.25rem; max-width: 3.25rem;" />
//                 <div class="fe-table__spacer" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div> -->
</style>

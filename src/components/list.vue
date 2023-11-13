<template>
  <div class="main-div">
    <div v-if="list.length > 0" class="table-div">
      <table style="width: 100%">
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th style="width: 20%">Action</th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ getFileName(item.fileName) }}</td>
          <td>
            <button @click="showPdf(item.fileName)">View</button>
            <button @click="deletePdf(item._id)">delete</button>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>No Files Uploaded</div>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="showModal" @close="showModal = false">
        <template #header>
          <h3>View Pdf</h3>
        </template>
        <template #body>
          <object
            :data="pdfUrl"
            type="application/pdf"
            width="100%"
            height="100%">
            <p>
              Unable to display PDF file.
              <a :href="pdfUrl">Download</a> instead.
            </p>
          </object>
        </template>
      </modal>
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";
import axios from "axios";
import modal from "./common/customModal.vue";
import { toast } from "vue3-toastify";

export default defineComponent({
  components: {
    modal,
  },
  setup(props) {
    const list = ref([]);
    const url = "http://localhost:5000";
    const pdfUrl = ref();
    const showModal = ref(false);

    onMounted(() => {
      fetchData();
    });

    async function showPdf(fileName) {
      try {
        let getItemUrl = `${url}/${fileName}`;
        const res = await axios.get(`${getItemUrl}`);
        console.log({ res });
        pdfUrl.value = res.data;
        this.showModal = true;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
          return;
        }
        // handle other errors here
        console.log(error);
      }
    }

    async function deletePdf(fileId) {
      const deleteUrl = `${url}/delete/${fileId}`;
      try {
        const res = await axios.delete(`http://localhost:5000/delete/${fileId}`);
        console.log({ res });
        if (res.status === 200) {
          toast("File Deleted successfully", {
            autoClose: 2000,
          });
          fetchData()
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
          return;
        }
        console.log(error);
      }
    }

    async function fetchData() {
      try {
        const uploads_url = `${url}/list`;
        const res = await axios.get(`${uploads_url}`);
        list.value = await res.data;
        console.log(list.value);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
          return;
        }
        console.log(error);
      }
    }

    function getFileName(fileName) {
      let name = fileName.split('_').slice(1).join('_')
      return name;
    }

    return {
      list,
      pdfUrl,
      showPdf,
      showModal,
      deletePdf,
      getFileName
    };
  },
});
</script>

<style scoped>
.list-item {
  cursor: pointer;
  color: blue;
  padding: 10px;
  font-size: 20px;
}
.list-item:hover {
  text-decoration: underline;
}
.list-div {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 50px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.table-div {
  margin: 20px;
}

button {
  padding: 5px;
  margin: 0 10px;
  cursor: pointer;
}

.main-div {
  text-align: center;
}
</style>

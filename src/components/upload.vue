<template>
  <div class="box">
    <input
      type="file"
      @change="fileSelected"
      accept="image/jpeg, application/pdf" />
    <input v-model="fileName" type="text" placeholder="Enter Name of file" />
    <input :class="[disableUpload ? 'disabledButton': 'button']" @click="uploadFile" type="button" :disabled="disableUpload" value="Upload" />
  </div>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";

export default defineComponent({
  setup(props) {
    const selectedFile = ref();
    const fileName = ref();
    const router = useRouter()

    // functions that mutate state and trigger updates
    function fileSelected(event) {
      console.log({ event });
      selectedFile.value = event.target.files[0];
    }

    async function uploadFile() {
      console.log(selectedFile.value, fileName.value);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        const uploads_url = "http://localhost:5000/upload";
        let formData = new FormData();
        formData.append("fileName", fileName.value);
        formData.append("file", selectedFile.value);
        console.log({formData})
        const res = await axios.post(`${uploads_url}`, formData, config);
        if (res.status === 200) {
          toast("File uploaded successfully", {
            autoClose: 2000,
          });
          router.push({ path: "/list" });
        }
        console.log({ res });
      } catch (error) {
        // Catch errors here and handle them accordingly
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
          return;
        }
        // handle other errors here
        console.log(error);
      }
    }

    const disableUpload = computed(() => {
      return !fileName.value || !selectedFile.value
    })

    return {
      fileSelected,
      fileName,
      uploadFile,
      disableUpload
    }
  },
});
</script>

<style scoped>
.box {
  top: 50%;
  left: 50%;
  width: 18em;
  height: 10em;
  margin-top: -9em;
  margin-left: -10em;
  border: 1px solid #666;
  position: fixed;
  padding: 50px;
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  padding: 5px;
  margin-top: 15px;
}

.button {
  background-color: #04aa6d;
  border: none;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  margin: 20px 2px;
  cursor: pointer;
}
.button:hover {
  background-color: white;
  color: #04aa6d;
  border: 1px solid #04aa6d;
}

.disabledButton {
  background: grey;
  border: none;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  margin: 20px 2px;
  cursor: not-allowed;
}
</style>

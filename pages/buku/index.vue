<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="text-center my-4"></h2>
        <div class="my-3">
          <input type="text" v-model="keyword" class="form-control rounded-5" placeholder="Mau Baca Apa Hari Ini?"
            @input="getBuku">
        </div>
        <div class="my-3 text-inter">Menampilkan Buku</div>
        <div class="row">
          <div class="col-lg-2" v-for="book in books">
            <div class="card mb-3" @click="navigateTo(`/buku/${book.id}`)">
              <div class="card-body">
                <img :src="book.cover" class="cover" alt="cover1">
              </div>
            </div>
          </div>
        </div>
        <NuxtLink to="/">
          <button type="button" class="btn btn-navbar-header">kembali</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const keyword = ref('')
const books = ref([])

const getBuku = async () => {
  const { data, error } = await supabase
    .from("buku")
    .select(`*, kategori_buku(*)`)
    .order("id", { ascending: false })
    .ilike("judul", `%${keyword.value}%`);
  if (error) throw error
  if (data) books.value = data;
}

onMounted(() => {
  getBuku()
})
</script>

<style scoped>
.card-body {
  width: 100%;
  height: 30em;
  padding: 0;
}

.cover {
  width: 100%;
  height: 80%;
  object-fit: cover;
  object-position: 0 20;
}
</style>
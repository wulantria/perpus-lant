<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="text-center my-4">RIWAYAT KUNJUNGAN</h2>
        <div class="my-3">
          <form @submit.prevent="getPengunjung">
            <input v-model="keyword" type="text" class="form-conrol form-control-lg rounded-5"
              placeholder="Mencari..." @input="getPengunjung" />
          </form>
        </div>
        <div class="my-3">Menampilkan {{ visitors.length }} Dari {{ Semua }}</div>
        <table class="table">
          <thead>
            <tr>
              <td>No</td>
              <td>tanggal</td>
              <td>nama</td>
              <td>kelas</td>
              <td>keanggotaan</td>
              <td>Jurusan</td>
              <td>keperluan</td>
              <td>Tingkat</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(visitor, i) in visitors" :key="i">
              <td>{{ i + 1 }}.</td>
              <td>{{ visitor.tanggal }}, {{ visitor.waktu }}</td>
              <td>{{ visitor.nama }}</td>
              <td>{{ visitor.kelas }}</td>
              <td>{{ visitor.keanggotaan.nama }}</td>
              <td>{{ visitor.keperluan.nama }}</td>
              <td>{{ visitor.Jurusan }}</td>
              <td>{{ visitor.Tingkat }}</td>
            </tr>
          </tbody>
        </table>
        <NuxtLink to="/">
          <button type="submit" class="btn btn-dark btn-lg rounded-5 px-5">Menu</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
  
<script setup>

const supabase = useSupabaseClient();

const Semua = ref(0);
const keyword = ref("");
const visitors = ref([]);

const getPengunjung = async () => {
  const { data, error } = await supabase
    .from("pengunjung")
    .select(`*, keanggotaan (nama), keperluan(nama)`)
    .order("id", { ascending: false })
    .ilike("nama", `%${keyword.value}%`);
  if (error) throw error
  if (data) visitors.value = data;
};

const getJumlah = async () => {
  const { count, error } = await supabase
    .from("pengunjung")
    .select(`*`, { count: 'exact', head: true })
  if (error) throw error
  if (count) Semua.value = count
};

onMounted(() => {
  getPengunjung();
  getJumlah();
});

</script>
<template>

  <default-layout>
    <AdminReportManagementComponent
      @movePageNum="reportMovePageNum"
      :pNum="pNum"
      :pSize="pSize"
      :key="componentKey"
    />
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminReportManagementComponent from "@/components/admin/ReportAdminComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()

const route = useRoute()

const pNum = ref(route.query.page || 1)

const pSize = ref(route.query.size || 10)

const componentKey = ref(0)

const reportMovePageNum = (pageNum) => {

  pNum.value = pageNum

  router.push({
    name: "ReportAdminPage",
    query: {
      page: pNum.value,
      size: pSize.value,
    }
  })
}

router.beforeEach((to, from, next) => {

  pSize.value = to.query.size

  pNum.value = to.query.page

  if (to.name == 'ReportAdminPage') componentKey.value++

  next()
})


</script>

<style scoped>

</style>

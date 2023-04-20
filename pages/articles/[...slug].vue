<template>
    <ContentDoc>
        <template #not-found>
            <h2>Blog slug ({{ $route.params.slug }}) not found</h2>
        </template>
    </ContentDoc>
</template>

<script>
export default {
    name: "_slug"
}
</script>

<style scoped>

</style>
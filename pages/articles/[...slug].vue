<template>
    <ContentDoc :path="$route.params.slug ? `/articles/${$route.params.slug[0]}` : '/'">
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
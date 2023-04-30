<template>
    <div
        ref="draggable"
        :class="[{ 'fixed z-50': dragging }, 'unselectable']"
        :style="[
            dragging
                ? { width: `${width}px`, left: `${left}px`, top: `${top}px` }
                : {}
        ]"
        @mousedown.left="onMouseDown"
        @mouseup.left="onMouseUp"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Draggable',
    emits: ['drop'],
    data() {
        return {
            dragging: false,
            width: 0,
            initialLeft: 0,
            initialTop: 0,
            left: 0,
            top: 0
        };
    },
    mounted() {
        window.addEventListener('mousemove', this.onMouseMove);
    },
    beforeUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove);
    },
    methods: {
        onMouseMove(event) {
            if (!this.dragging) {
                return;
            }

            this.bindToCursor(event.clientX, event.clientY);
        },
        onMouseDown(event) {
            this.width = this.$refs.draggable.offsetWidth;
            this.initialLeft = event.clientX - this.$refs.draggable.offsetLeft;
            this.initialTop = event.clientY - this.$refs.draggable.offsetTop;

            this.dragging = true;

            this.bindToCursor(event.clientX, event.clientY);
        },
        onMouseUp(event) {
            this.dragging = false;
            this.$emit('drop', event);
        },
        bindToCursor(clientX, clientY) {
            this.left = clientX - this.initialLeft;
            this.top = clientY - this.initialTop;
        }
    }
};
</script>

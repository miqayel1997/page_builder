<template>
    <div class="flex">
        <div
            class="fixed flex h-full w-1/4 flex-col gap-3 bg-slate-300 px-3 py-8"
        >
            <div
                v-for="(elementType, index) in elementTypes"
                :key="index"
                class="relative"
            >
                <div
                    class="flex h-12 cursor-move flex-col justify-center bg-slate-600 px-3 text-center text-white"
                    @drop="onDropElement($event, elementType)"
                >
                    {{ elementType.title }}
                </div>

                <Draggable
                    class="absolute left-0 top-0 flex h-12 w-full cursor-move flex-col justify-center bg-slate-600 px-3 text-center text-white"
                    @drop="onDropElement($event, elementType)"
                >
                    {{ elementType.title }}
                </Draggable>
            </div>
        </div>

        <div ref="canvas" class="prose ml-auto h-screen w-3/4 p-7">
            <div v-for="(element, index) in canvasElements" :key="index">
                <component :is="element.tag" :style="{ all: 'revert' }">
                    {{ element.text }}
                </component>
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from '@/components/Draggable.vue';

export default {
    name: 'PageBuilder',
    components: { Draggable },
    data: function () {
        return {
            elementTypes: [
                {
                    title: 'Heading',
                    content: {
                        tag: 'h1',
                        text: 'Sample heading'
                    }
                },
                {
                    title: 'Text',
                    content: {
                        tag: 'p',
                        text: 'Sample text'
                    }
                },
                {
                    title: 'Button',
                    content: {
                        tag: 'button',
                        text: 'Sample button'
                    }
                }
            ],
            canvasElements: []
        };
    },
    methods: {
        onDropElement(event, elementType) {
            if (event.clientX < this.$refs.canvas.offsetLeft) {
                return;
            }

            this.canvasElements = [
                ...this.canvasElements,
                { ...elementType.content }
            ];
        }
    }
};
</script>

# CwTest

http://localhost:4200/viewer/view/1 - без аннотаций

http://localhost:4200/viewer/view/2 - 100 аннотаций на 1-й странице

## Плюсы

Вроде работает по ТЗ

Аннотация добавляются по левому клику мыши.

Для добавления нового типа аннотаций нужно создать провайдер типа ANNOTATION_PROVIDER в папке annotation-providers.
Провайдер описывается интерфейсом AnnotationProvider, где
* type - тип аннотации
* menuText - текст пункта меню добавления аннотации
* addComponent - component для создания аннотации
* viewComponent - component для отображения аннотации

Например, в папке annotation-text2-provider уже добавлен ANNOTATION_TEXT2_PROVIDER.

Если раскомментировать строчку ANNOTATION_TEXT2_PROVIDER в файле annotation-providers.ts, то можно будем выбирать между двумя типами аннотаций. Второй тип отличается от первого только названием кнопок и цветом фона.

## Минусы

Кроме отсутствия стиля не заметил

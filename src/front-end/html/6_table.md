# 表格标签

不要使用表格布局，不利于无障碍，不利于理解和维护，不利于响应式布局（表格的大小默认与内容相关）

```html
<table>
  <tr>
    <th>&nbsp;</th>
    <th>Knocky</th>
    <th>Flor</th>
    <th>Ella</th>
    <th>Juan</th>
  </tr>
  <tr>
    <th>Breed</th>
    <td>Jack Russell</td>
    <td>Poodle</td>
    <td>Streetdog</td>
    <td>Cocker Spaniel</td>
  </tr>
</table>
```

## \<table>

表格，一般和 \<tr> \<td> 组合使用，可以在 \<td> 中嵌套 \<table>

## \<tr>

table row，表格中的一行

## \<td>

table data，表格中的一列，colspan="n" 属性合并 n 列，rowspan="m" 属性合并 m 行

```html
<tr>
  <th>Breed</td>
  <td rowspan="2">Jack Russell</td>
  <td>Poodle</td>
  <td colspan="2">Streetdog</td>
</tr>
<tr>
  <th>Age</td>
  <td>9</td>
  <td>10</td>
  <td>5</td>
</tr>
```

- rowspan="2" 合并了单元格 [1,2] 和 [2,2]

- colspan="2" 合并了单元格 [1,4] 和 [1,5]

## \<th>

- table head，标头，内容居中加粗，有利于无障碍阅读，屏幕阅读设备能一次读出一列或一行的数据

- 可使用 colspan rowspan 属性

- scope 属性，其值为 col 表示此单元格为一列的表头，其值为 row 表示此单元格为一行的表头，其值为 colgroup 表示此单元格为列表头且有多个具有 scope="col" 属性的子表头，值 rowgroup 同理

- 明确表头的另一种方式，id 和 headers 属性

```html
<thead>
  <tr>
    <th id="purchase">Purchase</th>
    <th id="location">Location</th>
    <th id="date">Date</th>
    <th id="evaluation">Evaluation</th>
    <th id="cost">Cost (€)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th id="haircut">Haircut</th>
    <td headers="location haircut">Hairdresser</td>
    <td headers="date haircut">12/09</td>
    <td headers="evaluation haircut">Great idea</td>
    <td headers="cost haircut">30</td>
  </tr>
  ......
</tbody>
```

## \<colgroup>

为表格中的某一列提供统一样式

```html
<table>
  <colgroup>
    <col />
    <col style="background-color: yellow" />
  </colgroup>
  <tr>
    <th>Data 1</th>
    <th>Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td>Orange</td>
  </tr>
</table>
```

由于第一列没有样式，使用 \<col />，\<col style="background-color: yellow" /> 为第二列提供样式

## \<caption>

表格标题，默认位于表格上并居中，有利于无障碍

```html
<table>
  <caption>
    侏罗纪时期的恐龙
  </caption>
  ......
</table>
```

## \<thead>

表头，在 \<col> \<colgroup> 元素下方

## \<tbody>

表体，浏览器会自动添加，在表头或表尾的下方

可以让表格的正文部分显示在一个单独的页面上，并通过上下滚动来获得内容

## \<tfoot>

表尾，一般在最后一行

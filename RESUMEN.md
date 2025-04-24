# Resumen de GitHub Actions

- **`name: Aprendiendo GitHub Actions`**  
  Es el nombre del Workflow que aparecerá en la sección de Actions en GitHub (opcional pero muy recomendado).

- **`run-name: ¡Estoy aprendiendo GitHub Actions!`**  
  Es el nombre específico del Workflow que aparecerá en la pestaña de Actions en GitHub (opcional).

- **`on: [push]`**  
  - `on` será la etiqueta que determine los triggers por los que se activará el Workflow.  
  - `[push]` es el trigger que activa el Workflow.  
  - Como es una lista, puedes agregar más triggers.

- **`jobs`**  
  Agrupa todos los jobs que ocurrirán en el Workflow (no contiene valor).

- **`hola-mundo`**  
  Es el identificador del job, así se diferenciará del resto (no puede contener espacios).

- **`runs-on: ubuntu-latest`**  
  Especifica el tipo de Runner para este job.

- **`steps`**  
  Agrupa todos los steps del job. Existen 2 tipos de steps:  
  - Los que ejecutan actions del Marketplace.  
  - Los que ejecutan comandos de shell.

- **`name: Checkout`**  
  Nombre del step, su identificador (opcional pero recomendado).

- **`uses: actions/checkout@v3`**  
  Usa la etiqueta `uses` para importar una action.

- **`run: python hola_mundo.py`**  
  Usa la etiqueta `run` para ejecutar un comando o script.

# GitHub Actions - Triggers y Workflows

## Push

**Push** se entiende cuando mandamos al repositorio remoto las actualizaciones del repositorio local.

Este script acaparará el trigger `push` mientras suceda en los branches `main` o `releases/**` (cualquier rama con nombre `release` o que nazca a partir de este nombre) y **solo se tendrá en cuenta si se han modificado archivos `.js`**.

```yaml
on:
  push:
    branches:
      - 'main'
      - 'releases/**'
    paths:
      - '**.js'
```

## Pull Request

El **Pull Request** será la petición de mergear una rama aislada con otra rama (generalmente `main`).

Este script se activará por un PR, específicamente en el momento de abrirlo y etiquetarlo (`opened` y `labeled`), y seguirá el resto de reglas que el `push`.

```yaml
on:
  pull_request:
    types:
      - [opened, labeled]
    branches:
      - 'releases/**'
    paths:
      - '**.js'
```

## Issues

Los **issues** son foros donde se anuncian disfuncionalidades del código por parte de la comunidad o los propios developers.

Tiene la misma lógica de los PR, sin embargo, los `types` cambiarán.

```yaml
on:
  issues:
    types:
      - [opened, edited, closed]
```

## Issue Comment

Cuando se generen comentarios en un Issue o un PR se activará este trigger.

### Comentarios en Issues

```yaml
on:
  issue_comment: 
    types: [created, deleted]
```

### Comentarios en Pull Request

En este caso, también se usará `issue_comment`, pero se añadirá un job que verificará que estamos sobre un pull request con el condicional dado:

```yaml
on: issue_comment

jobs:
  pr_commented:
    name: PR comment
    if: ${{ '{{ github.event.issue.pull_request }}' }}
```

## Workflow Dispatch

Los **Workflow dispatch** son workflows de activación manual, y permiten setear inputs configurables.

Este workflow contendrá 3 variables de entrada: `alerta`, `tags` y `enviroment`.

```yaml
on: 
  workflow_dispatch:
    inputs:
      alerta:
        description: 'Nivel'
        required: true
        default: medio
        type: choice
        option:
          - bajo
          - medio
          - alto

      tags:
        description: 'Opcional'
        required: false
        type: boolean

      enviroment:
        description: 'Objetivo'
        required: true
        type: string
```

## Schedule

Los **schedules** son un tipo de trigger que se activará automáticamente por una regla de tiempo.

```yaml
on:
  schedule:
    - cron: '30 5,17 * * *'
```

Esto usa notación **cron**:

```
[Minuto, Hora, Día del mes, Mes, Día de la semana]

Minuto       (0 - 59)
Hora         (0 - 23)
Día del mes  (1 - 31)
Mes          (1 - 12 o JAN - DEC)
Día semana   (0 - 6 o SUN - SAT)
```

- `*`: cíclico (cualquier valor)
- `,`: múltiples valores

Por lo tanto, `'30 5,17 * * *'` significa **a las 5:30AM y 5:30PM todos los días, todos los meses del año**.

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
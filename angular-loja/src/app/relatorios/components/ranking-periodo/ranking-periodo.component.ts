import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/util/services/alert.service';
import { RelatoriosService } from '../../services/relatorios.service';
import { Filtro } from './../../models/filtro';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ranking-periodo',
  templateUrl: './ranking-periodo.component.html',
  styleUrls: ['./ranking-periodo.component.scss']
})
export class RankingPeriodoComponent  implements OnInit{


  maxDataInicio = new Date();
  tipos = [];

  constructor(
    private formBuilder: FormBuilder,
    private relatoriosService: RelatoriosService,
    private datePipe: DatePipe,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.buscarTiposRelatorio();
  }


  periodo = this.formBuilder.group({

    dataInicio: [null],
    dataFim: [null],
    tipoRelatorio: [null],
  }, { validator: this.validarDatas });

  gerar(): void {
    const { dataInicio, dataFim, tipoRelatorio } = this.periodo.value;

    const dataInicioFormatada = this.datePipe.transform(dataInicio, 'yyyy-MM-dd');
    const dataFimFormatada = this.datePipe.transform(dataFim, 'yyyy-MM-dd');

    const filtro: Filtro = new Filtro();
    filtro.dataInicio = dataInicioFormatada;
    filtro.dataFim = dataFimFormatada;
    filtro.tipoRelatorio = tipoRelatorio;

    console.log(filtro);

    this.relatoriosService.gerarRankingPorPeriodo(filtro).subscribe({
      next: (result: any) => {
        console.log(result);

        const base64WithoutPrefix = result.split(',')[1];
        const binaryString = window.atob(base64WithoutPrefix);

        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        window.open(url, '_blank');

       //  window.open(url, '_blank');

        // const contentDisposition = result.headers.get("content-disposition");
        // const filename = this.parseFilenameFromContentDisposition(contentDisposition) + '.pdf';
        // this.createAndDownloadBlobFile(result.body, {}, filename);


        // const blob = new Blob([result], { type: 'application/pdf' });
        // const url = window.URL.createObjectURL(blob);

       //    window.open(url, '_blank');
        //IE
        // if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
        //   (window.navigator as any).msSaveOrOpenBlob(blob, 'relatorio.pdf');
        //   return;
        // }
        // //Chrome
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'relatorio.pdf';
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a)
        // window.URL.revokeObjectURL(url);
       // a.remove();
      },
      error: (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Erro HTTP:', error);

          if (error.status === 403) {
            // Handle 403 Forbidden error
            this.alertService.error('Acesso proibido. Verifique suas permissões.');
          } else if (error.error instanceof Blob) {
            // Verificar se o corpo da resposta de erro é um Blob
            this.readBlobAsText(error.error).then(errorMessage => {
              console.log('Mensagem de erro:', errorMessage);
              this.alertService.error(errorMessage || 'Erro desconhecido');
            }).catch(blobError => {
              console.error('Erro ao converter Blob para texto:', blobError);
              this.alertService.error('Erro ao processar a mensagem de erro');
            });
          } else {
            // Se não for um Blob, exibir a mensagem de erro diretamente
            const errorMessage = this.extractErrorMessage(error.error);
            console.log('Mensagem de erro:', errorMessage);
            this.alertService.error(errorMessage || 'Erro desconhecido');
          }
        } else {
          // Handle other errors
          this.alertService.error('Erro desconhecido. Tente novamente mais tarde.');
        }
      }
    });

  }

  private parseFilenameFromContentDisposition(contentDisposition) {
    if (!contentDisposition) return null;

    return contentDisposition
        .split(";")[1]
        .split("filename")[1]
        .split("=")[1]
        .trim();
}

//Esse método faz o download automático no navegador.
private createAndDownloadBlobFile(body, options, filename) {
  var blob = new Blob([body], options);
  if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
    (window.navigator as any).msSaveOrOpenBlob(blob, filename);
  } else {
      var link = document.createElement("a");
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

  // Função para converter Blob para texto
  private readBlobAsText(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

  // Extrai a mensagem de erro do JSON
  private extractErrorMessage(errorString: string): string {
    try {
      const errorObject = JSON.parse(errorString);
      return errorObject?.message || 'Erro desconhecido';
    } catch (e) {
      console.error('Erro ao analisar a mensagem de erro:', e);
      return 'Erro ao processar a mensagem de erro';
    }
  }

  validarDatas(group: FormGroup): { [key: string]: boolean } | null {
    const { dataInicio, dataFim } = group.value;

    if (dataInicio && dataFim && new Date(dataFim) < new Date(dataInicio)) {
      group.setErrors({ 'datasInvalidas': true });
      return { 'datasInvalidas': true };
    }

    return null;
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

  // BUSCAR CATEGORIAS
  buscarTiposRelatorio(): void {
    this.relatoriosService.buscarTiposRelatorio()
      .subscribe({
        next: result => {
          this.tipos = result as [];
        },
        error: e => {
          console.log(e.error);
          const msg: string = "Erro obtendo tipos de relatório.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  limparFormulario() {
    this.periodo.reset();
  }

  // Botão voltar à página anterior
  voltar() {
    history.go(-1);
  }
}

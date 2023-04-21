import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";
import { headerFunc } from "./header.js";

function main() {

  renderHeader();
  renderFooter();
  headerFunc();

}

export { main };

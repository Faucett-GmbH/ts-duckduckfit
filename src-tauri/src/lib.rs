#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let mut builder = tauri::Builder::default();

  #[cfg(any(target_os = "macos", windows, target_os = "linux"))]
  {
    builder = builder.plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
      println!("{}, {argv:?}, {cwd}", app.package_info().name);
    }));
  }

  builder = builder
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_deep_link::init());

  #[cfg(any(target_os = "linux", all(debug_assertions, windows)))]
  {
    builder = builder.setup(|app| {
      use tauri_plugin_deep_link::DeepLinkExt;
      app.deep_link().register_all()?;
      Ok(())
    });
  }
  #[cfg(debug_assertions)]
  {
    builder = builder.setup(|app| {
      use tauri::Manager;
      if let Some(webview) = app.get_webview_window("main") {
        webview.open_devtools();
      }
      Ok(())
    });
  }

  builder
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

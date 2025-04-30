{ pkgs ? import <nixpkgs> { } }:
let
  myPkgs = with pkgs; [
    alsa-lib
    at-spi2-atk
    cairo
    dbus
    libglvnd
    mesa
    libgbm
    glib
    gtk3
    nspr
    nss
    pango
    expat
    xorg.libX11
    xorg.libxcb
    xorg.libXcomposite
    xorg.libXdamage
    xorg.libXfixes
    xorg.libXext
    libxkbcommon
    xorg.libXrandr
  ];
in
pkgs.mkShell {
  buildInputs = myPkgs;
  shellHook = ''
    # Automatically create an LD_LIBRARY_PATH for each package.
    export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath myPkgs}:$LD_LIBRARY_PATH"
    echo "LD_LIBRARY_PATH set to: $LD_LIBRARY_PATH"
  '';
}

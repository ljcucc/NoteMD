import 'package:flutter/material.dart';
import 'package:note_md/pages/home_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme:
            ColorScheme.fromSeed(seedColor: Color.fromARGB(255, 93, 184, 33)),
        useMaterial3: true,
      ),
      home: MainLayout(),
    );
  }
}

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _selected = 0;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    final Map<int, Widget?> fabs = {
      0: FloatingActionButton(
        backgroundColor: colorScheme.tertiaryContainer,
        foregroundColor: colorScheme.onTertiaryContainer,
        elevation: 0,
        onPressed: () {},
        child: const Icon(Icons.add_rounded),
      ),
    };

    final navigationRail = NavigationRail(
      leading: SizedBox(height: 4),
      labelType: NavigationRailLabelType.all,
      selectedIndex: _selected,
      onDestinationSelected: (value) => setState(() => _selected = value),
      destinations: const [
        NavigationRailDestination(
          icon: Icon(Icons.home),
          label: Text("Home"),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.tag_rounded),
          label: Text("Tags"),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.settings),
          label: Text("Settings"),
        ),
      ],
    );

    final Orientation orientation = MediaQuery.of(context).orientation;

    return Scaffold(
      body: Row(
        children: [
          if (orientation == Orientation.landscape) navigationRail,
          Expanded(
            child: Container(
              child: [
                const HomePage(),
                Container(),
                Container(),
              ][_selected],
            ),
          ),
        ],
      ),
      floatingActionButton: fabs[_selected],
      bottomNavigationBar: orientation == Orientation.portrait
          ? NavigationBar(
              selectedIndex: _selected,
              onDestinationSelected: (value) =>
                  setState(() => _selected = value),
              destinations: const [
                NavigationDestination(
                  icon: Icon(Icons.home),
                  label: "Home",
                ),
                NavigationDestination(
                  icon: Icon(Icons.tag_rounded),
                  label: "Tags",
                ),
                NavigationDestination(
                  icon: Icon(Icons.settings),
                  label: "Settings",
                ),
              ],
            )
          : null,
    );
  }
}
